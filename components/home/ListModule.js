import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Plus from '../assets/plus'
import Minus from '../assets/minus'
import LinkOut from '../assets/LinkOut'
import Carousel from './Carousel'
import FBEventsPlugin from './FBEventsPlugin'
import { binder } from '../../lib/_utils'

export default class ListModule extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      scrollBarActual: false,
      xAmt: 0,
      yAmt: 0,
      scrollBarPos: 0,
      shouldAnimate: true,
      noScrollBar: false,
      imgHeight: 0
    }
    binder(this, ['handleExpand', 'manualExpand', 'renderGalleryContent', 'contentSwitcher', 'handleScroll', 'parseDate'])
  }

  componentDidMount () {
    if (this.props.shouldOpen) {
      this.handleExpand(true)
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.shouldOpen !== this.props.shouldOpen) {
      this.handleExpand(this.props.shouldOpen)
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state !== nextState || this.props.shouldOpen !== nextProps.shouldOpen) {
      return true
    } else {
      return false
    }
  }

  manualExpand () {
    if (this.props.data.location) {
      this.props.setActiveMarker(this.props.data.id)
    }
    this.handleExpand()
  }

  handleExpand (force) {
    this.setState({ isOpen: force || !this.state.isOpen })
    setTimeout(() => {
      if (this.state.isOpen) {
        this.setState({ imgHeight: this.descripBox.getBoundingClientRect().width })
        if (this.descripBox.scrollHeight < this.descripBoxInner.scrollHeight) {
          if (this.state.shouldAnimate) {
            const oX = this.expBtn.getBoundingClientRect().x
            const oY = this.expBtn.getBoundingClientRect().y
            const dX = this.scrollBar.getBoundingClientRect().x
            const dY = this.scrollBar.getBoundingClientRect().y

            const xAmt = dX - oX + 6
            const yAmt = dY - oY

            this.setState({
              xAmt,
              yAmt
            }, () => {
              setTimeout(() => {
                this.setState({ scrollBarActual: true, shouldAnimate: false })
              }, 900)
            })
          }
        } else {
          this.setState({ noScrollBar: true })
        }
      } else {
        this.setState({ scrollBarActual: false, shouldAnimate: true })
      }
    })
  }

  handleScroll (e) {
    if (this.state.scrollBarActual) {
      const scrollCap = e.target.scrollHeight - e.target.getBoundingClientRect().height
      const safeTop = e.target.scrollTop === 0 ? 1 : e.target.scrollTop
      const frac = parseFloat((safeTop / scrollCap).toFixed(3))
      const scrollBarPos = frac * (this.descripBox.getBoundingClientRect().height - 25)
      console.log(scrollBarPos)
      this.setState({ scrollBarPos, shouldAnimate: false })
    } else {
      e.preventDefault()
    }
  }

  parseDate (d) {
    const momentVersion = moment(d, moment.ISO_8601)
    const time = momentVersion.format('h:mm A')
    const date = momentVersion.format('MMMM Do')
    return {
      date,
      time
    }
  }

  renderGalleryContent (data) {
    const moduleWidth = this.descripBox ? this.descripBox.getBoundingClientRect().width : 200
    return (
      <div className='expanded-content'>
        <div ref={el => { this.descripBox = el }} className='descrip-outer'>
          <div ref={el => { this.scrollBar = el }} className='scrollbar-minus'>{ !this.state.noScrollBar && <Minus /> }</div>
          <div ref={el => { this.descripBoxInner = el }} onScroll={this.handleScroll} className='descrip-inner'>{ data.about ? data.about : data.description }</div>
          { data.email && <div className='website'><a href={`mailto:${data.email}`}>{ data.email }</a></div>}
        </div>
        {/* <div className='img-wrapper'>
          <img src={data.images[0]} />
        </div> */}
        {data.images.length > 0 && <Carousel images={data.images} height={this.state.imgHeight} /> }
        <FBEventsPlugin ID={data.id} width={moduleWidth} />
        { data.site &&
          <div className='site-link'>
            <a href={data.site}>{data.site.split('//')[1]}</a>
            <LinkOut/>
          </div>
        }
        <style jsx>{`
          .expanded-content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-top: 1em;
          }
          .descrip-outer {
            margin-bottom: 3em;
            margin-right: .5em;
            height: 6em;
            line-height: 1.5em;
            position: relative;
          }
          .descrip-inner {
            overflow: ${this.state.scrollBarActual ? 'scroll' : 'hidden'};
            width: 100%;
            height: 100%;
            overflow-wrap: break-word;
            padding-right: 1em;
            box-sizing: border-box;
            white-space: pre-line;
          }
          .scrollbar-minus {
            transform: rotate(90deg);
            position: absolute;
            top: ${this.state.scrollBarPos}px;
            right: -1em;
            visibility: ${!this.state.scrollBarActual && 'hidden'};
          }
          .img-wrapper {
            height: 100%; 
            object-fit: cover;
          }
          img {
            width: 100%;
            height: 100%;
          }
          a:hover {
            text-transform: uppercase;
          }
          .site-link {
            display: flex;
          }
          .site-link a {
            margin-right: .5em;
          }
        `}</style>
      </div>
    )
  }

  contentSwitcher (data) {
    return data.type === 'event' ? this.renderEventContent(data) : this.renderGalleryContent(data)
  }

  render () {
    const { data, handleToggle, listOpen, openList } = this.props
    const { isOpen, xAmt, yAmt } = this.state
    const actualPos = this.scrollBar ? `${this.scrollBar.getBoundingClientRect().x} ${this.scrollBar.getBoundingClientRect().y}` : '0 0'
    return (
      <div ref={el => { this.container = el }} className='outer-container' id={data.id}>
        { data ? <div className='inner-container'>
          <div ref={el => { this.expBtn = el }} onClick={this.manualExpand} className='expand-btn'>{isOpen ? <Minus /> : <Plus /> }</div>
          { this.state.isOpen && !this.state.noScrollBar && <div className='faux-minus'><Minus /></div> }
          <div className='title'>{ data.name }</div>
          <div className='address'>{ data.location ? data.location.street : '' }</div>
          {/* { isOpen && this.contentSwitcher(data) } */}
          { isOpen && this.renderGalleryContent(data) }
          { openList && listOpen && data.location && <div className='see-on-map' onClick={openList}>See on map</div> }
        </div> : null }
        <style jsx>{`
          .outer-container {
            background: var(--color-lightblue);
            margin: 2em;
            padding: 2em;
          }
          .inner-container {
            position: relative;
          }
          .expand-btn {
            cursor: pointer;
            position: absolute;
            top: -1em;
            right: -1em;
            width: 1em;
            height: 1em;
            z-index: 2;
          }
          .faux-minus {
            position: absolute;
            top: -1em;
            right: -1em;
            width: 1em;
            height: 1em;
            animation: moveMinus 1s forwards;
            visibility: ${!this.state.shouldAnimate && 'hidden'}
            // transform-origin: ${actualPos};
          }
          .title {
            font-weight: 700;
            text-transform: uppercase;
          }
          .see-on-map {
            cursor: pointer;
          }
          @keyframes moveMinus {
            0% {
              transform: rotate(0deg) translate3d(0, 0, 0);
              opacity: 1;
            }
            30% {
              transform: rotate(90deg) translate3d(0, 0, 0);
              opacity: 1;
            }
            99% {
              transform: rotate(90deg) translate3d(${yAmt}px, ${-xAmt}px, 0);
              opacity: 1;
            }
            100% {
              transform: rotate(90deg) translate3d(${yAmt}px, ${-xAmt}px, 0);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    )
  }
}

ListModule.propTypes = {}
