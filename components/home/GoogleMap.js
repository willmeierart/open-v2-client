import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import MapStyleManager from './MapStyleManager'

class GoogleMap extends Component {
	constructor (props) {
		super(props)

		const { activeMarker, markers } = this.props

		const initCenter = activeMarker
			? markers.filter(m => m.id === activeMarker).pop().marker.position
			: { lat: 39.755123, lng: -104.986663 }

		this.state = {
			inited: false,
			actualMapMarkers: [],
			center: initCenter.lat ? initCenter : this.defaultCenter,
			bounds: null,
			selectBegun: false
		}
		this.ACTUAL_MAP_MARKERS = []
		this.defaultCenter = { lat: 39.755123, lng: -104.986663 }
	}

	componentDidMount () {
		const init = () => {
			const mapNode = ReactDOM.findDOMNode(this.mapDOM)
			if (window.google && this.mapDOM && this.props.markers.length > 0) {
				const { google } = window
				// init options go here
				this.map = new google.maps.Map(mapNode, {
					styles: this.props.mapStyles,
					zoom: 14,
					center: this.state.center,
					disableDefaultUI: true
				})

				this.toggleActiveMarkers()
				this.setState({ inited: true }, () => {
					this.setCenterViaMarkers(this.ACTUAL_MAP_MARKERS)
				})
				// window.google.maps.event.addListener(this.map, 'idle', () => {
				//   if (this.map.getZoom() !== 14) {
				//     this.map.setZoom(14)
				//   }
				// })
			} else {
				setTimeout(init, 400)
			}
		}
		init()
	}

	componentDidUpdate (prevProps) {
		if (this.props.view !== prevProps.view) {
			this.setState({ style: this.props.mapStyles[this.props.view] })
		}
		if (this.props.activeMarker !== prevProps.activeMarker) {
			const { activeMarker, markers } = this.props
			const newCenter = markers.filter(m => m.id === activeMarker).pop().marker.position

			this.toggleActiveMarkers()
			this.setState({ center: newCenter.lat ? newCenter : this.defaultCenter, selectBegun: true }, () => {
				this.map.panTo(this.state.center)
			})
		}
	}

	shouldComponentUpdate (newProps, newState) {
		if (
			newState.style !== this.state.style ||
			newProps.markers !== this.props.markers ||
			newState.center !== this.state.center
		) {
			return true
		}
		return false
	}

	toggleActiveMarkers = () => {
		if (!this.state.inited) {
			console.log('toggle not inited, ', this.props.markers)
			this.props.markers.forEach(marker => {
				marker.marker.map = this.map
				const MARKER = new window.google.maps.Marker(marker.marker)
				console.log(MARKER)
				MARKER.addListener('click', () => {
					this.props.setActiveMarker(marker.id)
				})
				this.ACTUAL_MAP_MARKERS.push(MARKER)
			})

			this.setState({ actualMapMarkers: this.ACTUAL_MAP_MARKERS })
		} else {
			console.log('toggle inited')

			this.state.actualMapMarkers.forEach((marker, i) => {
				const url =
					this.props.markers[i].id === this.props.activeMarker
						? `/static/assets/ox${Math.floor(Math.random() * 4) + 1}.svg`
						: `/static/assets/o${Math.floor(Math.random() * 4) + 1}.svg`
				marker.setIcon(url)
			})
		}
	}

	setCenterViaMarkers = markers => {
		if (markers.length > 1) {
			// only calculate bounds frame if more than one marker
			let maxLat = null
			let minLat = null
			let maxLng = null
			let minLng = null

			this.setState({ bounds: null }, () => {
				const markerCenter = markers.reduce(
					(obj, marker) => {
						const mainCluster =
							marker.title.toLowerCase().indexOf('boulder') === -1 &&
							marker.title.toLowerCase().indexOf('dairy') === -1 &&
							marker.title.toLowerCase().indexOf('gym') === -1 &&
							marker.title.toLowerCase().indexOf('outdoor') === -1 &&
							marker.title.toLowerCase().indexOf('edge') === -1 &&
							marker.title.toLowerCase().indexOf('pirate') === -1 &&
							marker.title.toLowerCase().indexOf('myhren') === -1
						if (marker.position && mainCluster) {
							if (maxLat === null || marker.position.lat > maxLat) maxLat = marker.position.lat()
							if (minLat === null || marker.position.lat < minLat) minLat = marker.position.lat()
							if (maxLng === null || marker.position.lng > maxLng) maxLng = marker.position.lng()
							if (minLng === null || marker.position.lng < minLng) minLng = marker.position.lng()
							obj.coords.lat = parseFloat(((maxLat + minLat) / 2).toFixed(5))
							obj.coords.lng = parseFloat(((maxLng + minLng) / 2).toFixed(5))
							const invokedPos = { lat: marker.position.lat(), lng: marker.position.lng() }
							this.setBounds(invokedPos) // expand map bounds to the largest needed to show all markers
						}
						return obj
					},
					{ coords: { lat: 0, lng: 0 } }
				)
				if (markerCenter.coords.lat === 0 && markerCenter.coords.lng === 0) {
					console.warn('markercenter.Coords are 0,0 - defaulting to props.center')
					this.map.setCenter(this.props.center)
				} else {
					this.map.setCenter(markerCenter.coords)
				}
			})
		} else if (markers.length === 1) {
			const { lat, lng } = markers[0].position
			this.setCenter({ lat: lat(), lng: lng() })
		}
	}

	setBounds = marker => {
		const mainAction = () => {
			if (marker) {
				this.setState({ bounds: this.state.bounds.extend(marker) }, () => {
					this.map.fitBounds(this.state.bounds) // center map around markers
				})
			}
		}
		if (!this.state.bounds) {
			// init bounds
			this.setState({ bounds: new window.google.maps.LatLngBounds() }, mainAction)
		} else {
			mainAction()
		}
	}

	render () {
		return (
			<div className='outer-wrapper'>
				<div
					id='map'
					className='map'
					ref={map => {
						this.mapDOM = map
					}}
				/>
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

GoogleMap.propTypes = {
	activeMarker: PropTypes.string.isRequired,
	actualMapMarkers: PropTypes.arrayOf(PropTypes.object).isRequired,
	mapStyles: PropTypes.arrayOf(PropTypes.object).isRequired,
	markers: PropTypes.arrayOf(PropTypes.object).isRequired,
	setActiveMarker: PropTypes.func.isRequired,
	setActualMapMarkers: PropTypes.func.isRequired
}

export default MapStyleManager(GoogleMap)
