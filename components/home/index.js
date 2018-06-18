import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { connect } from 'react-redux'
import { binder } from '../../lib/_utils'
import DataManager from './DataManager'
import ListView from './ListView'
import GoogleMap from './GoogleMap'
import EventsToggle from './EventsToggle'
import ScrollBar from './ScrollBar'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      view: 'events' // || 'galleries'
    }
    binder(this, ['handleToggle'])
  }

  componentDidMount () {}

  handleToggle () {
    const { toggleState } = this.state
    this.setState({ toggleState: toggleState === 1 ? 0 : 1 })
  }

  render () {
    return (
      <div className='outer-wrapper'>
        <div className='inner-wrapper'>
          {/* <div className='map-wrapper'>
              <GoogleMap view={this.state.view} />
            </div>
            <div className='events-list-wrapper'>
              <ListView list={{ gallery: FBdata.events }} />
            </div>
            <div className='galleries-list-wrapper'>
              <ListView list={{ gallery: FBdata.galleries }} />
            </div> */}
          {/* { this.state.toggleState === 0
            ? <div className='events-wrapper'>
              <div className='section-inner'>
                <EventsToggle eventState={toggleState} toggleEventState={this.handleToggle} />
              </div>
            </div>
            : <div className='galleries-wrapper'>
              <div className='section-inner'></div>
            </div>
          } */}
          <div id='scrollbar'>
            <ScrollBar view={this.props.viewState} />
          </div>
          <div id='events-view'>
          </div>
          <div id='galleries-view'>

          </div>
        </div>
        <style jsx>{`
        .outer-wrapper {
          min-height: 100vh;
          height: 100vh;
        }
        .inner-wrapper {
          display: grid;
          grid-template-columns: auto 100px auto;
        }
        #scrollbar {
          grid-column: 2/3;
        }
      `}</style>
      </div>
    )
  }
}

Home.propTypes = {}

// export default DataManager(App)
function mapStateToProps (state) {
  return {
    // isMobile: state.env.isMobile,
    // dims: state.env.dims,
    // FBdata: state.data.FBdata
    viewState: state.ui.viewState
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // onCheckIfMobile: () => dispatch(checkIfMobile()),
    // onGetVPDims: () => dispatch(getVPDims()),
    // onFetchFBdata: () => dispatch(fetchFBdata())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
