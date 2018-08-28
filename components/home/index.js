import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchFBdata, setAllMapMarkers, setViewState, setEventsState } from '../../lib/redux/actions'
import { gallery, todayEvent, futureEvent } from '../../lib/mockData'
import ViewMobile from './ViewMobile'
import ViewDesktop from './ViewDesktop'
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
    window.addEventListener('resize', this.handleScrollBarPos)
  }

  componentDidUpdate (prevProps) {
    if (this.props.FBdata !== prevProps.FBdata && this.props.allMapMarkers.length < 1) {
      this.setAllMapMarkers()
    }
  }

  returnMockDataList () {
    const { FBdata, eventsState } = this.props
    const fakeGalleries = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(x => gallery)
    const fakeEvents = { today: [0, 0, 0, 0, 0, 0, 0, 0].map(x => todayEvent), upcoming: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(x => futureEvent)
    }
    const testEventsList = FBdata ? FBdata.events[eventsState].concat(fakeEvents[eventsState]) : fakeEvents[eventsState]
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

  setAllMapMarkers () {
    const { FBdata: { galleries, events: { upcoming, today } } } = this.props
    const checker = []
    const markerList = galleries.concat(today).concat(upcoming).reduce((a, b) => {
      const { id, name, type } = b
      const coords = {
        lat: b.place ? b.place.location.latitude : b.location.latitude,
        lng: b.place ? b.place.location.latitude : b.location.longitude
      }
      const formatObj = {id, name, type, coords}
      const marker = makeMarker(formatObj)
      if (checker.indexOf(b.id) === -1) {
        checker.push(b.id)
        a.push(marker)
      }
      // console.log(marker, checker)
      return a
    }, [])
    this.props.onSetAllMapMarkers(markerList)
  }

  handleToggle (eventsState) {
    this.props.onSetEventsState(eventsState)
  }

  render () {
    const { FBdata, introSeen, viewState, eventsState, allMapMarkers, onSetViewState, onSetEventsState } = this.props
    const { testEventsList, testGalleriesList, scrollBarWidth, scrollBarPosY } = this.state

    const mapMarkers = filter => this.props.allMapMarkers.filter(m => m.type === filter)

    return <div>{
      this.props.isMobile
      ? <ViewMobile FBdata={FBdata} events={testEventsList} galleries={testGalleriesList} introSeen={introSeen} viewState={viewState} eventsState={eventsState} allMapMarkers={allMapMarkers} onSetViewState={onSetViewState} onSetEventsState={onSetEventsState} mapMarkers={mapMarkers} showMap={this.showMap} handleToggle={this.handleToggle} bodyHeight={this.bodyHeight}>
        <MarqueeHeader title={viewState} />
      </ViewMobile>
      : <ViewDesktop FBdata={FBdata} events={testEventsList} galleries={testGalleriesList} introSeen={introSeen} viewState={viewState} eventsState={eventsState} allMapMarkers={allMapMarkers} onSetViewState={onSetViewState} onSetEventsState={onSetEventsState} mapMarkers={mapMarkers} showMap={this.showMap}  handleToggle={this.handleToggle} bodyHeight={this.bodyHeight}/>
    }</div>
  }
}

Home.propTypes = {
  FBdata: PropTypes.object,
  onFetchFBdata: PropTypes.func.isRequired,
  onSetAllMapMarkers: PropTypes.func.isRequired,
  allMapMarkers: PropTypes.array.isRequired
}

function mapStateToProps (state) {
  return {
    FBdata: state.data.FBdata,
    allMapMarkers: state.data.allMapMarkers,
    eventsState: state.ui.eventsState,
    viewState: state.ui.viewState,
    introSeen: state.env.introSeen
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onFetchFBdata: () => dispatch(fetchFBdata()),
    onSetAllMapMarkers: markers => dispatch(setAllMapMarkers(markers)),
    onSetViewState: viewState => dispatch(setViewState(viewState)),
    onSetEventsState: eventsState => dispatch(setEventsState(eventsState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
