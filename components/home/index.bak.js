import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { connect } from 'react-redux'
// import { TransitionMotion, spring } from 'react-motion'
import { binder } from '../../lib/_utils'
import { gallery, todayEvent, futureEvent } from '../../lib/mockData'
import ListView from './ListView'
import GoogleMap from './GoogleMap'
import EventsToggle from './EventsToggle'
import ScrollBar from './ScrollBar'
import { setViewState } from '../../lib/redux/actions';

class Home extends Component {
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
    binder(this, ['handleToggle', 'handleScrollBarPos', 'handleListScroll', 'preventScrollAndReset', 'handleEventsToggleClick'])

    this.fakeGalleries = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(x => gallery)
    this.fakeEvents = {
      today: [0, 0, 0, 0, 0, 0, 0, 0].map(x => todayEvent),
      upcoming: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(x => futureEvent)
    }
    this.bodyHeight = 'calc(100vh - 100px)'

    this.showMap = false
  }

  componentDidMount () {
    console.log('desktop')
    window.addEventListener('resize', this.handleScrollBarPos)
  }

  componentDidUpdate (prevProps) {
    const num = this.props.viewState === 'events' ? 1 : 2
    if (this.props.viewState !== prevProps.viewState) {
      console.log('component did update scroll firing')
      this.setState({ scrollView: num }, () => {
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
    if (this.state.canScroll) {
      if (e) {
        if (e.target === this.leftList || e.target === this.rightList) {
          // console.log(e.target)
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
        this.handleScrollView(null, num)
      }
    } else {
      if (e) this.preventScrollAndReset(e)
    }
  }

  animateScrollBarReset (num) {
    let i = 0
    const interval = setInterval(() => {
      i++
      const { scrollBarPosY } = this.state

      console.log(scrollBarPosY, num)

      this.leftList.scrollTop = 0
      this.rightList.scrollTop = 0
      // if (num === 2) {
      if (scrollBarPosY <= 0.01) {
        clearInterval(interval)
      } else {
        this.setState({ scrollBarPosY: scrollBarPosY - 0.25 })
      }
      // } else if (num === 1) {
      //   if (scrollBarPosY >= 0.99) {
      //     clearInterval(interval)
      //   } else {
      //     this.setState({ scrollBarPosY: scrollBarPosY + 0.001 })
      //   }
      // }
      // if (i === 33) clearInterval(interval)
    }, 16)
  }

  handleScrollView (e, num) {
    const view = num === 2 ? 'galleries' : 'events'
    // console.log('handle scroll view', this.state.canScroll, e.target, num)
    this.props.onSetViewState(view)
    // if (!this.state.canScroll) {
    //   if (e) this.preventScrollAndReset(e)
    //   return
    // }
    this.animateScrollBarReset(num)

    this.setState({
      canScroll: false,
      scrollView: num,
      animateAmt: num === 2 ? (window.innerHeight - 100) * -1 : 0,
      view: num === 2 ? 'galleries' : 'events'
    }, () => {
      setTimeout(() => {
        this.setState({ canScroll: true })
      }, 500)
    })
  }

  preventScrollAndReset (e) {
    console.log('shouldnt be scrolling')
    e.preventDefault()
    // this.leftList.scrollTop = 0
    // this.rightList.scrollTop = 0
  }

  handleEventsToggleClick (eventsState) {
    // console.log(eventsState)
    this.setState({ eventsState })
  }

  render () {
    const {
      state: { scrollView, scrollBarWidth, animate, animateAmt, scrollBarPosY, canScroll, eventsState },
      props: { viewState },
      bodyHeight, fakeGalleries, fakeEvents, handleEventsToggleClick
    } = this
    console.log(canScroll)

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
              { this.showMap && <GoogleMap type='events' /> }
            </div>
          </div>
          <div id='galleries-view' className='view-sec'>
            <div className='left'>
              { this.showMap && <GoogleMap type='galleries' /> }
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
          transition: transform 500ms;
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

Home.propTypes = {}

function mapStateToProps (state) {
  return {
    viewState: state.ui.viewState
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSetViewState: viewState => dispatch(setViewState(viewState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
