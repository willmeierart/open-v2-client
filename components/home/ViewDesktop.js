import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { binder } from '../../lib/_utils'
import ListView from './ListView'
import ScrollBar from './ScrollBar'

export default class Desktop extends Component {
  constructor (props) {
    super(props)
    this.state = {
      canScroll: true,
      scrollBarPosY: 0.001,
      scrollBarWidth: 0,
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
          const frac = parseFloat(safeTop / scrollCap)
          this.handleScrollBarPos(frac)

        }
      } else if (num) {
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
      props: { introSeen, galleries, bodyHeight, activeMarker, children, setActiveMarker }
    } = this

    return (
      <div className='outer-wrapper'>
        <div id='scrollbar'>
          <ScrollBar yPos={scrollBarPosY} />
        </div>
        <div className='inner-wrapper'>
          <div id='galleries-view' className='view-sec'>
            <div className='left'>
              { children }
            </div>
            <div id='list-view' onScroll={e => { this.handleListScroll(e, 2) }} ref={rightList => { this.rightList = rightList }} className='right'>
              <ListView list={galleries} setActiveMarker={setActiveMarker} activeID={activeMarker} />
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

Desktop.propTypes = {
  FBdata: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(
        PropTypes.object
      )
    ])
  ),
  activeMarker: PropTypes.string,
  actualMapMarkers: PropTypes.arrayOf(PropTypes.object).isRequired,
  allMapMarkers: PropTypes.arrayOf(PropTypes.object).isRequired,
  bodyHeight: PropTypes.string.isRequired,
  galleries: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleToggle: PropTypes.func.isRequired,
  introSeen: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  mapMarkers: PropTypes.func.isRequired,
  onFetchFBdata: PropTypes.func.isRequired,
  onSetActiveMarker: PropTypes.func.isRequired,
  onSetActualMapMarkers: PropTypes.func.isRequired,
  onSetAllMapMarkers: PropTypes.func.isRequired,
  setActiveMarker: PropTypes.func.isRequired
}
