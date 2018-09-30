import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { binder } from '../../lib/_utils'
import { gallery, todayEvent, futureEvent } from '../../lib/mockData'
import ListView from './ListView'
import GoogleMap from './GoogleMap'
import EventsToggle from './EventsToggle'
import ScrollBar from './ScrollBar'

export default class Mobile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      canScroll: true,
      view: 'galleries', // || 'events'
      animateAmt: 0,
      viewPos: 'calc(100vh - 4em - 230px)',
      // eventsState: 'today', // || 'upcoming',
      scrollBarPosY: 0,
      viewOpen: false
    }
    binder(this, ['handleListScroll', 'preventScroll', 'handleTitleBarClick', 'handleScrollBarPos'])

    this.viewClosedAmt = 'calc(100vh - 4em - 100px)'

    this.viewOpenAmt = '20px'
  }

  componentDidMount () {
    console.log('mobile')
  }

  handleScrollBarPos (frac) {
    if (frac) {
      this.setState({ scrollBarPosY: frac })
    }
  }

  handleListScroll (e) {
    // console.log('firing')
    if (this.state.canScroll) {
      if (e) {
        if (e.target === this.list) {
          // console.log(e.target)
          const scrollCap = e.target.scrollHeight - e.target.getBoundingClientRect().height
          const safeTop = e.target.scrollTop === 0 ? 0.01 : e.target.scrollTop
          // console.log(e.target.scrollTop, e.target.scrollHeight, scrollCap, safeTop)
          const frac = parseFloat(safeTop / scrollCap)
          this.handleScrollBarPos(frac)
        }
        // console.log(e.target)
      }
    } else {
      if (e) this.preventScroll(e)
    }
  }

  preventScroll (e) {
    console.log('shouldnt be scrolling')
    e.preventDefault()
    e.stopPropagation()
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
      state: { viewPos, scrollBarPosY },
      props: { viewState, eventsState, galleries, showMap, handleToggle, bodyHeight, children, setActiveMarker, activeMarker }
    } = this

    const markerType = viewState === 'events' ? 'event' : 'galleries'

    return (
      <div className='outer-wrapper'>
        <div id='google-map'>
          { showMap && children[1] }
          {/* { showMap && <GoogleMap markers={mapMarkers(markerType)} type={viewState} setActiveMarker={this.props.onSetActiveMarker} /> } */}
        </div>
        <div className='inner-wrapper'>
          <div id='view'>
            <div id='scrollbar'>
              <ScrollBar isMobile yPos={scrollBarPosY} view={viewState} />
            </div>
            <div onClick={this.handleTitleBarClick} className='title-wrapper' ref={titleBar => { this.titleBar = titleBar }}>
              { children[0] }
            </div>
            <div id='list-view' className='list-section' onScroll={e => { this.handleListScroll(e) }} ref={list => { this.list = list }}>
              {/* <EventsToggle eventState={eventsState} toggleEventState={handleToggle} /> */}
              <ListView state={eventsState} list={galleries} setActiveMarker={setActiveMarker} activeID={activeMarker} />
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
          background-color: ${this.state.view === 'galleries' ? 'var(--color-green)' : 'var(--color-blue)'};
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
          background-color: ${this.state.view === 'events' ? 'var(--color-green)' : 'var(--color-blue)'};
          // overflow: scroll;
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
          overflow: scroll;
          height: 100%;
        }
      `}</style>
      </div>
    )
  }
}

Mobile.propTypes = {}
