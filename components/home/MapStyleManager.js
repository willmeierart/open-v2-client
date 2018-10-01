import React, { Component } from 'react'

export default function MapStyleManager (ComposedComponent) {
  class WrappedComponent extends Component {
    constructor (props) {
      super(props)
      this.styles = {
        base: [
          {
            "featureType": "administrative",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#168e7e"
              },
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#fffbff"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#000000"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#fffdfe"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#a3ccfe"
              }
            ]
          }
        ],
        events: [
          {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#5A76E4"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#008F7E"
              }
            ]
          },
        ],
        galleries: [
          {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#008F7E"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#5A76E4"
              }
            ]
          },
        ]
      }
    }
    render () {
      return (
        <ComposedComponent mapStyles={this.styles.base.concat(this.styles[this.props.type])} {...this.props} />
      )
    }
  }
  return WrappedComponent
}
