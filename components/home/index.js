import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchFBdata, setAllMapMarkers, setViewState, setEventsState, setActiveMarker, setActualMapMarkers } from '../../lib/redux/actions'
import { gallery, todayEvent, futureEvent } from '../../lib/mockData'
import ViewMobile from './ViewMobile'
import ViewDesktop from './ViewDesktop'
import GoogleMap from './GoogleMap'
import MarqueeHeader from '../core/MarqueeHeader'
import { makeMarker, binder } from '../../lib/_utils'

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

    binder(this, ['returnMockDataList', 'handleMapMarkers', 'setAllMapMarkers', 'handleToggle'])

    this.showMap = true
    this.bodyHeight = 'calc(100vh - 100px)'
  }

  async componentDidMount () {
    await this.props.onFetchFBdata()
    this.returnMockDataList()
  }

  componentDidUpdate (prevProps) {
    if (this.props.FBdata && (
      (this.props.FBdata !== prevProps.FBdata && this.props.allMapMarkers.length < 1) ||
      this.props.activeMarker !== prevProps.activeMarker
    )) {
      this.setAllMapMarkers(this.props.activeMarker)
      // setTimeout(() => { this.setAllMapMarkers(this.props.activeMarker) })
    }
  }

  returnMockDataList () {
    const { FBdata, eventsState } = this.props
    const fakeGalleries = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(x => gallery)
    const fakeEvents = { today: [0, 0, 0, 0, 0, 0, 0, 0].map(x => todayEvent), upcoming: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(x => futureEvent)
    }
    // const testEventsList = FBdata ? FBdata.events[eventsState].concat(fakeEvents[eventsState]) : fakeEvents[eventsState]
    const testEventsList = fakeEvents[eventsState]
    const testGalleriesList = FBdata ? FBdata.galleries.concat(fakeGalleries) : fakeGalleries
    this.setState({ testEventsList, testGalleriesList })
  }

  handleMapMarkers () {
    const teLocations = this.state.testEventsList.map(ev => ({
      id: ev.id,
      name: ev.name,
      coords: {
        lat: ev.place.location.latitude,
        lng: ev.place.location.longitude
      }
    }))
    const tgLocations = this.state.testGalleriesList.map(ev => ({
      id: ev.id,
      name: ev.name,
      coords: {
        lat: ev.location.latitude,
        lng: ev.location.longitude
      }
    }))
  }

  setAllMapMarkers (activeMarkerID) {
    const { FBdata: { galleries, events: { upcoming, today } }, activeMarker } = this.props
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

        // console.log(activeMarkerID, activeMarker, b.id)

        const formatObj = {id, name, type, coords, active}
        const marker = makeMarker(formatObj)
        if (checker.indexOf(b.id) === -1) {
          checker.push(b.id)
          a.push(marker)
        }
        // marker.addEventListener('click', () => {
        //   console.log('marker')
        // })

        // console.log(marker, checker, b)
        return a
      }
    }, [])
    this.props.onSetAllMapMarkers(markerList)
  }

  handleToggle (eventsState) {
    this.props.onSetEventsState(eventsState)
  }

  render () {
    const { FBdata, viewState, onSetActiveMarker, activeMarker, onSetActualMapMarkers, actualMapMarkers } = this.props
    const { testEventsList, testGalleriesList } = this.state

    const mapMarkers = filter => this.props.allMapMarkers.filter(m => m.type === filter)

    // console.log(FBdata)
    
    const galleries = FBdata ? FBdata.galleries : testGalleriesList

    return <div>{
      this.props.isMobile
      ? <ViewMobile {...this.props} events={testEventsList} galleries={galleries} 
          mapMarkers={mapMarkers} showMap={this.showMap} handleToggle={this.handleToggle} 
          bodyHeight={this.bodyHeight} setActiveMarker={onSetActiveMarker} activeMarker={activeMarker}>
        <MarqueeHeader title={viewState} />
        <GoogleMap markers={mapMarkers('gallery')} type='galleries'
          setActiveMarker={onSetActiveMarker} activeMarker={activeMarker}
          setActualMapMarkers={onSetActualMapMarkers} actualMapMarkers={actualMapMarkers} />
      </ViewMobile>
      : <ViewDesktop {...this.props} events={testEventsList} galleries={galleries}
          mapMarkers={mapMarkers} showMap={this.showMap} handleToggle={this.handleToggle}
          bodyHeight={this.bodyHeight} setActiveMarker={onSetActiveMarker} activeMarker={activeMarker}>
        <GoogleMap markers={mapMarkers('gallery')} type='galleries'
          setActiveMarker={onSetActiveMarker} activeMarker={activeMarker}
          setActualMapMarkers={onSetActualMapMarkers} actualMapMarkers={actualMapMarkers} />
      </ViewDesktop>
    }</div>
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
  activeMarker: PropTypes.string.isRequired
}

function mapStateToProps (state) {
  return {
    FBdata: state.data.FBdata,
    allMapMarkers: state.data.allMapMarkers,
    actualMapMarkers: state.data.allMapMarkers,
    activeMarker: state.data.activeMarker,
    eventsState: state.ui.eventsState,
    viewState: state.ui.viewState,
    introSeen: state.env.introSeen
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onFetchFBdata: () => dispatch(fetchFBdata()),
    onSetAllMapMarkers: markers => dispatch(setAllMapMarkers(markers)),
    onSetActualMapMarkers: markers => dispatch(setActualMapMarkers(markers)),
    onSetViewState: viewState => dispatch(setViewState(viewState)),
    onSetEventsState: eventsState => dispatch(setEventsState(eventsState)),
    onSetActiveMarker: activeMarkerID => dispatch(setActiveMarker(activeMarkerID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
