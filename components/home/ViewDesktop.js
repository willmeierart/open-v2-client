import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { binder } from '../../lib/_utils'
import { gallery, todayEvent, futureEvent } from '../../lib/mockData'
import ListView from './ListView'
import GoogleMap from './GoogleMap'
import EventsToggle from './EventsToggle'
import ScrollBar from './ScrollBar'

export default class Desktop extends Component {
  constructor (props) {
    super(props)
    this.state = {
      canScroll: true,
      view: 'galleries', // || 'events'
      scrollBarPosY: 0.001,
      scrollBarWidth: 0,
      scrollView: 1, // || 2
      animate: false,
      animateAmt: 0
    }

    binder(this, ['handleListScroll', 'preventScrollAndReset', 'handleScrollBarPos'])
  }

  componentDidMount () {
    console.log('desktop')
    window.addEventListener('resize', this.handleScrollBarPos)
  }

  componentDidUpdate (prevProps) {
    const num = this.props.viewState === 'events' ? 1 : 2
    if (this.props.viewState !== prevProps.viewState) {
      // console.log('component did update scroll firing')
      this.setState({ scrollView: num }, () => {
        this.handleListScroll(null, num)
      })
    }
  }

  handleListScroll (e, num) {
    if (this.state.canScroll) {
      if (e) {
        if (e.target === this.leftList || e.target === this.rightList) {
          const scrollCap = e.target.scrollHeight - e.target.getBoundingClientRect().height
          const safeTop = e.target.scrollTop === 0 ? 0.01 : e.target.scrollTop
          const up = num === 2 && e.target.scrollTop === 0
          const down = num === 1 && e.target.scrollTop === scrollCap
          const frac = parseFloat(safeTop / scrollCap)
          this.handleScrollBarPos(frac)
          // if (up) {
          //   this.handleScrollView(e, 1)
          // } else if (down) {
          //   this.handleScrollView(e, 2)
          // }
        }
      } else if (num) {
        // this.handleScrollView(null, num)
      }
    } else {
      if (e) this.preventScrollAndReset(e)
    }
  }
  
  handleScrollBarPos (frac) {
    if (frac) {
      if (this.state.scrollBarWidth !== `${window.innerWidth / 2 - 15}px`) {
        this.setState({ scrollBarWidth: `${window.innerWidth / 2 - 15}px` })
      }
      this.setState({ scrollBarPosY: frac })
    }
  }

  preventScrollAndReset (e) {
    console.log('shouldnt be scrolling')
    e.preventDefault()
  }

  render () {
    const {
      state: { animateAmt, scrollBarWidth, scrollBarPosY },
      props: { viewState, introSeen, mapMarkers, galleries, showMap, bodyHeight, onSetActiveMarker, activeMarker, onSetActualMapMarkers, actualMapMarkers, children }
    } = this

    return (
      <div className='outer-wrapper'>
        <div id='scrollbar'>
          <ScrollBar yPos={scrollBarPosY} view={viewState} />
        </div>
        <div className='inner-wrapper'>
          <div id='galleries-view' className='view-sec'>
            <div className='left'>
              {/* <GoogleMap markers={mapMarkers('gallery')} type='galleries' setActiveMarker={onSetActiveMarker} activeMarker={activeMarker} setActualMapMarkers={onSetActualMapMarkers} actualMapMarkers={actualMapMarkers} /> */}
              { children }
            </div>
            <div onScroll={e => { this.handleListScroll(e, 2) }} ref={rightList => { this.rightList = rightList }} className='right'>
              {/* <ListView list={fakeGalleries} /> */}
              <ListView list={galleries} />
            </div>
          </div>
        </div>
        <style jsx>{`
        .outer-wrapper {
          min-height: ${bodyHeight};
          height: ${bodyHeight};
          width: 100vw;
          display: flex;
          margin-top: ${introSeen && '100px'};
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

Desktop.propTypes = {}
