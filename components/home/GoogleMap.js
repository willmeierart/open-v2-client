import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { binder } from '../../lib/_utils'
import MapStyleManager from './MapStyleManager'

class GoogleMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      style: this.props.mapStyles[this.props.view]
    }
    // binder(this, [''])
  }

  componentDidMount () {
    const mapNode = ReactDOM.findDOMNode(this[`${this.props.type}MapDOM`])
    const init = () => {
      console.log(typeof this[`${this.props.type}MapDOM`])
      if (window.google && this[`${this.props.type}MapDOM`]) {
        console.log(this.props.type)
        const { google } = window
        console.log(mapNode)
        // init options go here
        this[`${this.props.type}Map`] = new google.maps.Map(mapNode, {
          styles: this.props.mapStyles,
          zoom: 14,
          center: { lat: 39.755123, lng: -104.986663 },
          disableDefaultUI: true
        })
        // const THIS_MAP = this[`${this.props.type}Map`]
        // console.log(THIS_MAP, `${this.props.type}Map`)
      } else {
        setTimeout(init, 500)
      }
    }
    init()
  }

  componentDidUpdate (prevProps) {
    if (this.props.view !== prevProps.view) {
      this.setState({ style: this.props.mapStyles[this.props.view] })
      // animate func?
    }
  }

  render () {
    return (
      <div className='outer-wrapper'>
        <div id={`${this.props.type}-map`} className='map' ref={map => { this[`${this.props.type}MapDOM`] = map }} />
        <style jsx>{`
          .outer-wrapper {
            width: 100%;
            height: 100%;
          }
          .map {
            width: 100%;
            height: 100%;
            overflow: visible;
          }
        `}</style>
      </div>
    )
  }
}

GoogleMap.propTypes = {}

export default MapStyleManager(GoogleMap)
