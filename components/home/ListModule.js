import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Plus from '../assets/plus'
import Minus from '../assets/minus'
import { binder } from '../../lib/_utils'

export default class ListModule extends Component {
  // console.log(data)
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
    binder(this, ['handleExpand', 'renderEventContent', 'renderGalleryContent', 'contentSwitcher', 'handleScroll'])
  }

  handleExpand () { this.setState({ isOpen: !this.state.isOpen }) }

  handleScroll () {

  }

  renderEventContent (data) {
    return (
      <div className='expanded-content'>
        <div className='date'>
          <span>{ data.start_time }</span>
          <span>{' - '}</span>
          <span>{ data.end_time }</span>
        </div>
        <div className='descrip-outer'>
          <div className='scrollbar-minus'><Minus /></div>
          <div className='descrip-inner'>{ data.description }</div>
        </div>
        <div className='img-wrapper'>
          <img src={data.cover} />
        </div>
        <style jsx>{`
          .expanded-content {
            
          }
          .date {
            text-transform: uppercase;
            margin-bottom: 1em;
          }
          .descrip-outer {
            margin-bottom: 1em;
            margin-right: .5em;
            height: 6em;
            line-height: 1.5em;
            position: relative;
          }
          .descrip-inner {
            overflow: scroll;
            width: 100%;
            height: 100%;
            overflow-wrap: break-word;
          }
          .scrollbar-minus {
            transform: rotate(90deg);
            position: absolute;
            top: 0;
            right: -1em;
          }
          .img-wrapper {
            width: 100%; 
            object-fit: cover;
          }
          img {
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    )
  }

  renderGalleryContent (data) {
    return (
      <div className='expanded-content'>
        <div className='descrip-outer'>
          <div className='descrip-inner'>{ data.about ? data.about : data.description }</div>
          <div className='link'> some email </div>
        </div>
        <div className='img-wrapper'>
          <img src={data.cover} />
        </div>
        <style jsx>{`
          .expanded-content {
            display: flex;
            justify-content: space-between;
            margin-top: 1em;
          }
          .descrip-outer {
            margin-bottom: 1em;
            margin-right: 1em;
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .descrip-inner {
            margin-bottom: 1em;
          }
          .img-wrapper {
            height: 100%; 
            object-fit: cover;
          }
          img {
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    )
  }

  contentSwitcher (data) {
    return data.type === 'event' ? this.renderEventContent(data) : this.renderGalleryContent(data)
  }

  render () {
    const { data, handleToggle } = this.props
    const { isOpen } = this.state
    return (
      <div className='outer-container'>
        <div className='inner-container'>
          <div onClick={this.handleExpand} className='expand-btn'>{isOpen ? <Minus /> : <Plus /> }</div>
          <div className='title'>{ data.name }</div>
          <div className='address'>{ data.location ? data.location.street : data.owner + ' - ' + data.place.location.street }</div>
          { isOpen && this.contentSwitcher(data) }
        </div>
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
            transform: ${data.type === 'event' ? !isOpen ? 'rotate(-90deg)' : 'rotate(-180deg)' : 'rotate(0deg)'};
            transition: ${ data.type === 'event' && 'transform 1s'};
          }
          .title {
            font-weight: 700;
            text-transform: uppercase;
          }
        `}</style>
      </div>
    )
  }
}

ListModule.propTypes = {}
