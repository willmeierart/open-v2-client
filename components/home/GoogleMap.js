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
      inited: false,
      actualMapMarkers: []
    }
    binder(this, ['toggleActiveMarkers'])
    this.ACTUAL_MAP_MARKERS = []
  }

  componentDidMount () {
    const mapNode = ReactDOM.findDOMNode(this.mapDOM)
    const init = () => {
      if (window.google && this.mapDOM) {
        const { google } = window
        // init options go here
        this.map = new google.maps.Map(mapNode, {
          styles: this.props.mapStyles,
          zoom: 14,
          center: { lat: 39.755123, lng: -104.986663 },
          disableDefaultUI: true
        })

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
    if (this.props.activeMarker !== prevProps.activeMarker) {
      this.toggleActiveMarkers()
    }
  }

  toggleActiveMarkers () {
    const markerIDs = this.ACTUAL_MAP_MARKERS.map(m => m.id)

    if (!this.state.inited) {
      this.props.markers.forEach(marker => {
        marker.marker.map = this.map
        const MARKER = new window.google.maps.Marker(marker.marker)
        MARKER.addListener('click', () => {
          this.props.setActiveMarker(marker.id)
        })
        this.ACTUAL_MAP_MARKERS.push(MARKER)
      })

      this.setState({ actualMapMarkers: this.ACTUAL_MAP_MARKERS })

    } else {
      this.state.actualMapMarkers.forEach((marker, i) => {
        const url = this.props.markers[i].id === this.props.activeMarker
          ? `/static/assets/ox${Math.floor(Math.random() * 4) + 1}.svg` 
          : `/static/assets/o${Math.floor(Math.random() * 4) + 1}.svg` 
        marker.setIcon(url)
      })
    }
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
        <div id='map' className='map' ref={map => { this.mapDOM = map }} />
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
