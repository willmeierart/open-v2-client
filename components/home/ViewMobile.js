import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { connect } from 'react-redux'
// import { TransitionMotion, spring } from 'react-motion'
import { binder } from '../../lib/_utils'
import { gallery, todayEvent, futureEvent } from '../../lib/mockData'
import DataManager from './DataManager'
import ListView from './ListView'
import GoogleMap from './GoogleMap'
import EventsToggle from './EventsToggle'
import ScrollBar from './ScrollBar'
import { setViewState } from '../../lib/redux/actions';

class ViewMobile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      canScroll: true,
      view: 'events', // || 'galleries'
      scrollBarPosY: 0.001,
      scrollBarWidth: 0,
      scrollView: 1, // || 2
      animate: false,
      animateAmt: 0,
      eventsState: 'today' // || 'upcoming'
    }
    binder(this, ['handleToggle', 'handleScrollBarPos', 'handleListScroll', 'willEnter', 'preventScrollAndReset', 'handleEventsToggleClick'])

    this.fakeGalleries = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(x => gallery)
    this.fakeEvents = {
      today: [0, 0, 0, 0, 0, 0, 0, 0].map(x => todayEvent),
      upcoming: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(x => futureEvent)
    }
    this.bodyHeight = 'calc(100vh - 100px)'
  }

  componentDidMount () {
    console.log('VIEW MOBILE')
    window.addEventListener('resize', this.handleScrollBarPos)
  }

  componentDidUpdate (prevProps) {
    const num = this.props.viewState === 'events' ? 1 : 2
    if (this.props.viewState !== prevProps.viewState) {
      this.setState({ canScroll: true, scrollView: num }, () => {
        this.handleListScroll(null, num)
      })
    }
  }

  handleToggle () {
    const { toggleState } = this.state
    this.setState({ toggleState: toggleState === 1 ? 0 : 1 })
  }

  handleScrollBarPos (frac) {
    // if (this.state.canScroll) {
      if (this.state.scrollBarWidth !== `${window.innerWidth / 2 - 15}px`) {
        this.setState({ scrollBarWidth: `${window.innerWidth / 2 - 15}px` })
      }
      // console.log(frac, typeof frac)
      this.setState({ scrollBarPosY: frac })
    // }
  }

  handleListScroll (e, num) {
    // e.stopPropagation()
    if (e) {
      if (e.target === this.leftList || e.target === this.rightList) {
        // console.log(e.target, this.leftList)
        const scrollCap = e.target.scrollHeight - e.target.getBoundingClientRect().height
        const safeTop = e.target.scrollTop === 0 ? 1 : e.target.scrollTop
        // console.log(e.target.scrollTop, e.target.scrollHeight, scrollCap, safeTop)
        const up = num === 2 && e.target.scrollTop === 0
        const down = num === 1 && e.target.scrollTop === scrollCap
        const frac = parseFloat((safeTop / scrollCap).toFixed(3))
        this.handleScrollBarPos(frac)
        if (up) {
          this.handleScrollView(e, 1)
        } else if (down) {
          this.handleScrollView(e, 2)
        }
      }
    } else if (num) {
      this.handleScrollView(e, num)
    }
  }

  animateScrollBarReset (num) {
    // num === 2 ? 0.001 : 1
    let i = 0
    const interval = setInterval(() => {
      i++
      const { scrollBarPosY } = this.state
      this.leftList.scrollTop = 0
      this.rightList.scrollTop = 0
      if (num === 2) {
        if (scrollBarPosY <= 0.001) {
          clearInterval(interval)
        } else {
          this.setState({ scrollBarPosY: scrollBarPosY - 0.001 })
        }
      } else if (num === 1) {
        if (scrollBarPosY >= 1) {
          clearInterval(interval)
        } else {
          this.setState({ scrollBarPosY: scrollBarPosY + 0.001 })
        }
      }
      if (i === 66) clearInterval(interval)
    }, 16)
  }

  async handleScrollView (e, num) {
    const view = num === 2 ? 'galleries' : 'events'
    // console.log('handle scroll view', num)
    if (!this.state.canScroll) {
      this.preventScrollAndReset(e)
    }
    // await this.props.onSetViewState(view)
    this.setState({
      canScroll: false,
      scrollView: num,
      animateAmt: num === 2 ? (window.innerHeight - 100) * -1 : 0,
      view
      // scrollBarPosY: this.animateScrollBarReset(num)
    }, () => {
      setTimeout(() => {
        this.setState({ canScroll: true })
      }, 1000)
    })
    this.animateScrollBarReset()
  }

  preventScrollAndReset (e) {
    if (e) e.preventDefault()
    // this.leftList.scrollTop = 0
    // this.rightList.scrollTop = 0
  }

  willEnter () {
    return { translate: window.innerHeight - 100 }
  }

  handleEventsToggleClick (eventsState) {
    // console.log(eventsState)
    this.setState({ eventsState })
  }

  render () {
    const {
      state: { scrollView, scrollBarWidth, animate, animateAmt, scrollBarPosY, canScroll, eventsState },
      props: { viewState },
      bodyHeight, willEnter, fakeGalleries, fakeEvents, handleEventsToggleClick
    } = this
    // console.log(animateAmt, canScroll)

    return (
      <div className='outer-wrapper'>
        <div id='scrollbar'>
          <ScrollBar yPos={scrollBarPosY} view={viewState} />
        </div>
          <div className='inner-wrapper'>
            <div id='events-view' className='view-sec'>
              <div onScroll={e => { this.handleListScroll(e, 1) }} ref={leftList => { this.leftList = leftList }} className='left'>
                <EventsToggle eventState={eventsState} toggleEventState={handleEventsToggleClick} />
                <ListView state={eventsState} list={fakeEvents[eventsState]} />
              </div>
              <div className='right'>
                <GoogleMap type='events' />
              </div>
            </div>
            <div id='galleries-view' className='view-sec'>
              <div className='left'>
                <GoogleMap type='galleries' />
              </div>
              <div onScroll={e => { this.handleListScroll(e, 2) }} ref={rightList => { this.rightList = rightList }} className='right'>
                <ListView list={fakeGalleries} />
              </div>
            </div>
          </div>
        <style jsx>{`
        .outer-wrapper {
          min-height: ${bodyHeight};
          height: ${bodyHeight};
          width: 100vw;
          display: flex;
          margin-top: 100px;
          position: relative;
        }
        .inner-wrapper {
          min-height: ${bodyHeight};
          width: 100vw;
          display: flex;
          flex-direction: column;
          position: absolute;
          transform: translateY(${animateAmt + 'px'});
          will-change: transform;
          transition: transform 1s;
          transition-timing-function: ease-out;
        }
        #events-view, #galleries-view {
          display: grid;
          grid-template-columns: 1fr 30px 1fr;
          height: ${bodyHeight};
          width: 100%;
          min-height: ${bodyHeight};
        }
        #scrollbar {
          position: fixed;
          left: ${scrollBarWidth === 0 ? window.innerWidth / 2 - 15 + 'px' : scrollBarWidth};
          height: ${bodyHeight};
          top: 100px;
          z-index: -1;
        }
        .left, .right {
          overflow-x: hidden;
          overflow-y: scroll;
          height: ${bodyHeight};
        }
        #events-view .left, #galleries-view .left {
          background-color: var(--color-green);
        }
        #events-view .right, #galleries-view .right {
          background-color: var(--color-blue);
        }
        .left {
          grid-column: 1/2;
        }
        .right {
          grid-column: 3/4;
        }
      `}</style>
      </div>
    )
  }
}

ViewMobile.propTypes = {}

// export default DataManager(App)
function mapStateToProps (state) {
  return {
    // isMobile: state.env.isMobile,
    // dims: state.env.dims,
    // FBdata: state.data.FBdata
    viewState: state.ui.viewState
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // onCheckIfMobile: () => dispatch(checkIfMobile()),
    // onGetVPDims: () => dispatch(getVPDims()),
    // onFetchFBdata: () => dispatch(fetchFBdata())
    onSetViewState: viewState => dispatch(setViewState(viewState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMobile)


//   < TransitionMotion
// willEnter = { willEnter }
// styles = { [{ key: scrollView, style: { translate: spring(0, { stiffness: 60, damping: 15 }) }, width: '100%', height: '100%' }]} >
//   {
//     interpolated =>
//       <div style={{ width: '100%', height: '100%' }}>
//         {interpolated.map(config =>
//           <div className='inner-wrapper' config={config} style={{
//             transform: `translate3d(0, ${config.style.translate}px, 0)`,
//             willChange: 'transform',
//             width: '100%',
//             height: '100%'
//           }}>
//             <div id='events-view' className='view-sec'>
//               <div onScroll={e => { this.handleListScroll(e, 1) }} ref={leftList => { this.leftList = leftList }} className='left'>
//                 <ListView list={this.fakeEvents} />
//               </div>
//               <div className='right'>
//                 <GoogleMap type='events' />
//               </div>
//             </div>
//             <div id='galleries-view' className='view-sec'>
//               <div className='left'>
//                 <GoogleMap type='galleries' />
//               </div>
//               <div onScroll={e => { this.handleListScroll(e, 2) }} ref={rightList => { this.rightList = rightList }} className='right'>
//                 <ListView list={this.fakeGalleries} />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//   }
//         </TransitionMotion >