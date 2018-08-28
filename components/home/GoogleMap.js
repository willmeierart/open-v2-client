import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { binder } from '../../lib/_utils'
import MapStyleManager from './MapStyleManager'

class GoogleMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      style: this.props.mapStyles[this.props.view],
      inited: false
    }
    binder(this, ['toggleActiveMarkers'])
  }

  componentDidMount () {
    const mapNode = ReactDOM.findDOMNode(this[`${this.props.type}MapDOM`])
    const init = () => {
      if (window.google && this[`${this.props.type}MapDOM`]) {
        const { google } = window
        // init options go here
        this[`${this.props.type}Map`] = new google.maps.Map(mapNode, {
          styles: this.props.mapStyles,
          zoom: 14,
          center: { lat: 39.755123, lng: -104.986663 },
          disableDefaultUI: true
        })
        // const THIS_MAP = this[`${this.props.type}Map`]

        this.toggleActiveMarkers()
        this.setState({ inited: true })
      } else {
        setTimeout(init, 800)
      }
    }
    init()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.view !== prevProps.view) {
      this.setState({ style: this.props.mapStyles[this.props.view] })
      // animate func?
    }
    // if (this.state.inited !== prevState.inited) {
    //   console.log('INITED CHANGED', this.props.markers.length)
    //   if (this.props.markers.length > 0) {

    //     this.toggleActiveMarkers()
    //   }
    // }
    // if (this.props.markers !== prevProps.markers) {
    //   if (this.state.inited) {
    //     this.toggleActiveMarkers()
    //   }
    // }
  }

  toggleActiveMarkers () {
    // console.log('MARKERS', this.props.markers, window.google.maps)
    return this.props.markers.forEach(marker => {
      marker.marker.map = this[`${this.props.type}Map`]
      const MARKER = new window.google.maps.Marker(marker.marker)
      // trueMarker.map = this[`${this.props.type}MapDOM`]
      
      // console.log('ASSIGNING MAP TO:', marker, MARKER)
    })
  }

  shouldComponentUpdate (newProps, newState) {
    if (
      newState.style !== this.state.style ||
      newProps.markers !== this.props.markers
    ) {
      return true
    }
    return false
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
