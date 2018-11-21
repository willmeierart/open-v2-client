import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchFBdata, setAllMapMarkers, setActiveMarker, setActualMapMarkers } from '../../lib/redux/actions'
import ViewMobile from './ViewMobile'
import ViewDesktop from './ViewDesktop'
import GoogleMap from './GoogleMap'
import MarqueeHeader from '../core/MarqueeHeader'
import { makeMarker } from '../../lib/_utils'

class Home extends Component {
	constructor (props) {
		super(props)

		this.state = {
			view: 'events',
			eventsState: 'today', // || 'upcoming'
			testEventsList: [],
			testGalleriesList: [],
			scrollBarPosY: 0.001,
			scrollBarWidth: 0
		}

		this.bodyHeight = 'calc(100vh - 100px)'
	}

	async componentDidMount () {
		if (!this.props.FBdata) {
			await this.props.onFetchFBdata()
		}
	}

	componentDidUpdate (prevProps) {
		if (
			this.props.FBdata &&
			((this.props.FBdata !== prevProps.FBdata && this.props.allMapMarkers.length < 1) ||
				this.props.activeMarker !== prevProps.activeMarker)
		) {
			this.setAllMapMarkers(this.props.activeMarker)
			// setTimeout(() => { this.setAllMapMarkers(this.props.activeMarker) })
		}
	}

	setAllMapMarkers = activeMarkerID => {
		const { FBdata: { galleries, events: { upcoming, today } } } = this.props
		const checker = []
		const markerList = galleries.concat(today).concat(upcoming).reduce((a, b) => {
			const { id, name, type } = b
			if (!b.location) {
				return a
			} else {
				const coords = {
					lat: b.location.latitude,
					lng: b.location.longitude
				}
				const active = activeMarkerID === b.id

				const formatObj = { id, name, type, coords, active }
				const marker = makeMarker(formatObj)
				if (checker.indexOf(b.id) === -1) {
					checker.push(b.id)
					a.push(marker)
				}
				return a
			}
		}, [])
		this.props.onSetAllMapMarkers(markerList)
	}

	handleToggle = eventsState => {
		this.props.onSetEventsState(eventsState)
	}

	render () {
		const { FBdata, onSetActiveMarker, activeMarker, onSetActualMapMarkers, actualMapMarkers } = this.props

		const mapMarkers = filter => this.props.allMapMarkers.filter(m => m.type === filter)

		const galleries = FBdata ? FBdata.galleries : []

		return (
			<div>
				{this.props.isMobile ? (
					<ViewMobile
						{...this.props}
						galleries={galleries}
						mapMarkers={mapMarkers}
						handleToggle={this.handleToggle}
						bodyHeight={this.bodyHeight}
						setActiveMarker={onSetActiveMarker}
						activeMarker={activeMarker}
						marqueeHeader={handleClick => <MarqueeHeader handleClick={handleClick} isMobile title={'galleries'} />}
					>
						<GoogleMap
							markers={mapMarkers('gallery')}
							setActiveMarker={onSetActiveMarker}
							activeMarker={activeMarker}
							setActualMapMarkers={onSetActualMapMarkers}
							actualMapMarkers={actualMapMarkers}
						/>
					</ViewMobile>
				) : (
					<ViewDesktop
						{...this.props}
						galleries={galleries}
						mapMarkers={mapMarkers}
						handleToggle={this.handleToggle}
						bodyHeight={this.bodyHeight}
						setActiveMarker={onSetActiveMarker}
						activeMarker={activeMarker}
					>
						<GoogleMap
							markers={mapMarkers('gallery')}
							setActiveMarker={onSetActiveMarker}
							activeMarker={activeMarker}
							setActualMapMarkers={onSetActualMapMarkers}
							actualMapMarkers={actualMapMarkers}
						/>
					</ViewDesktop>
				)}
			</div>
		)
	}
}

function mapStateToProps (state) {
	return {
		FBdata: state.data.FBdata,
		allMapMarkers: state.data.allMapMarkers,
		actualMapMarkers: state.data.allMapMarkers,
		activeMarker: state.data.activeMarker,
		introSeen: state.env.introSeen
	}
}

function mapDispatchToProps (dispatch) {
	return {
		onFetchFBdata: () => dispatch(fetchFBdata()),
		onSetAllMapMarkers: markers => dispatch(setAllMapMarkers(markers)),
		onSetActualMapMarkers: markers => dispatch(setActualMapMarkers(markers)),
		onSetActiveMarker: activeMarkerID => dispatch(setActiveMarker(activeMarkerID))
	}
}

Home.propTypes = {
	FBdata: PropTypes.object,
	onFetchFBdata: PropTypes.func.isRequired,
	onSetAllMapMarkers: PropTypes.func.isRequired,
	onSetActiveMarker: PropTypes.func.isRequired,
	onSetActualMapMarkers: PropTypes.func.isRequired,
	allMapMarkers: PropTypes.array.isRequired,
	actualMapMarkers: PropTypes.array.isRequired,
	activeMarker: PropTypes.string.isRequired,
	introSeen: PropTypes.bool.isRequired,
	isMobile: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
