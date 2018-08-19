import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchFBdata, setAllMapMarkers } from '../../lib/redux/actions'
import ViewMobile from './ViewMobile'
import ViewDesktop from './ViewDesktop'
import { makeMarker } from '../../lib/_utils'

class Home extends Component {
  async componentDidMount () {
    await this.props.onFetchFBdata()
    
  }

  componentDidUpdate (prevProps) {
    if (this.props.FBdata !== prevProps.FBdata && this.props.allMapMarkers.length < 1) {
      this.setAllMapMarkers()
    }
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
      console.log(marker, checker)
      return a
    }, [])
    this.props.onSetAllMapMarkers(markerList)
  }

  render () {
    console.log(this.props)
    return <div>{
      this.props.isMobile
      ? <ViewMobile FBdata={this.props.FBdata} />
      : <ViewDesktop FBdata={this.props.FBdata} />
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
    allMapMarkers: state.data.allMapMarkers
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onFetchFBdata: () => dispatch(fetchFBdata()),
    onSetAllMapMarkers: markers => dispatch(setAllMapMarkers(markers))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
