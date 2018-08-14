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
import MarqueeHeader from '../core/MarqueeHeader'
import { setViewState } from '../../lib/redux/actions'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      canScroll: true,
      view: 'events', // || 'galleries'
      animateAmt: 0,
      viewPos: 'calc(100vh - 4em - 230px)',
      eventsState: 'today', // || 'upcoming',
      scrollBarPosY: 0,
      viewOpen: false
    }
    binder(this, ['handleToggle', 'handleListScroll', 'preventScroll', 'handleEventsToggleClick', 'handleTitleBarClick', 'handleScrollBarPos'])

    this.fakeGalleries = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(x => gallery)
    this.fakeEvents = {
      today: [0, 0, 0, 0, 0, 0, 0, 0].map(x => todayEvent),
      upcoming: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(x => futureEvent)
    }
    this.bodyHeight = 'calc(100vh - 100px)'
    this.viewClosedAmt = 'calc(100vh - 4em - 100px)'
    this.viewOpenAmt = '20px'

    this.showMap = false
  }

  componentDidMount () {
    console.log('mobile')
  }

  handleToggle () {
    const { toggleState } = this.state
    this.setState({ toggleState: toggleState === 1 ? 0 : 1 })
  }

  handleListScroll (e) {
    console.log('firing')
    if (this.state.canScroll) {
      if (e) {
        // if (e.target === this.list) {
        //   // console.log(e.target)
        //   const scrollCap = e.target.scrollHeight - e.target.getBoundingClientRect().height
        //   const safeTop = e.target.scrollTop === 0 ? 1 : e.target.scrollTop
        //   // console.log(e.target.scrollTop, e.target.scrollHeight, scrollCap, safeTop)
        //   const up = num === 2 && e.target.scrollTop === 0
        //   const down = num === 1 && e.target.scrollTop === scrollCap
        //   const frac = parseFloat((safeTop / scrollCap).toFixed(3))
        //   this.handleScrollBarPos(frac)
        //   if (up) {
        //     this.handleScrollView(e, 1)
        //   } else if (down) {
        //     this.handleScrollView(e, 2)
        //   }
        // }
        console.log(e.target)
      }
    } else {
      if (e) this.preventScroll(e)
    }
  }

  handleScrollBarPos (frac) {
    if (this.state.scrollBarWidth !== `${window.innerWidth / 2 - 15}px`) {
      this.setState({ scrollBarWidth: `${window.innerWidth / 2 - 15}px` })
    }
    this.setState({ scrollBarPosY: frac })
  }

  preventScroll (e) {
    console.log('shouldnt be scrolling')
    e.preventDefault()
    e.stopPropagation()
    // this.leftList.scrollTop = 0
    // this.rightList.scrollTop = 0
  }

  handleEventsToggleClick (eventsState) {
    // console.log(eventsState)
    this.setState({ eventsState })
  }

  handleTitleBarClick () {
    const { viewOpen } = this.state
    this.setState({
      viewPos: viewOpen ? this.viewClosedAmt : this.viewOpenAmt,
      viewOpen: !viewOpen
    })
  }

  render () {
    const {
      state: { viewPos, animateAmt, scrollBarPosY, canScroll, eventsState },
      props: { viewState },
      bodyHeight, fakeGalleries, fakeEvents, handleEventsToggleClick
    } = this
    console.log(canScroll)

    return (
      <div className='outer-wrapper'>
        <div id='google-map'>
          {this.showMap && <GoogleMap type='events' />}
        </div>
        <div className='inner-wrapper' onScroll={this.preventScroll}>
          <div onScroll={this.preventScroll} id='view'>
            <div id='scrollbar'>
              <ScrollBar isMobile yPos={scrollBarPosY} view={viewState} />
            </div>
            <div onClick={this.handleTitleBarClick} className='title-wrapper' ref={titleBar => { this.titleBar = titleBar }}>
              <MarqueeHeader title={this.state.view} />
            </div>
            <div className='list-section' onScroll={this.handleListScroll} ref={list => { this.list = list }}>
              <EventsToggle eventState={eventsState} toggleEventState={handleEventsToggleClick} />
              <ListView state={eventsState} list={fakeEvents[eventsState]} />
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
        #google-map {
          position: absolute;
          width: 100vw;
          height: calc(100%);
          display: flex;
          background-color: ${this.state.view === 'galleries' ? 'var(--color-green)' : 'var(--color-blue)'}
        }
        .inner-wrapper {
          min-height: ${bodyHeight};
          width: 100vw;
          display: flex;
          flex-direction: column;
          position: absolute;
          transform: translateY(${viewPos});
          will-change: transform;
          transition: transform 500ms;
          transition-timing-function: ease-out;
        }
        #view {
          height: calc(${bodyHeight} - 50px);
          width: 100vw;
          min-height: ${bodyHeight};
          position: relative;
          background-color: ${this.state.view === 'events' ? 'var(--color-green)' : 'var(--color-blue)'}
        }
        #scrollbar {
          position: absolute;
          right: 0;
          height: ${bodyHeight};
          top: 4em;
          z-index: 1;
        }
        .title-wrapper {
          background: black;
          height: 4em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          cursor: pointer;
        }
        .list-section {
          width: calc(100vw - 20px);
          transform: translateY(${animateAmt});
          will-change: transform;
          transition: transform 500ms;
          transition-timing-function: ease-out;
          overflow-y: scroll;
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
