import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { binder } from '../../lib/_utils'
import DataManager from './DataManager'
import ListView from './ListView'
import GoogleMap from './GoogleMap'

class Home extends Component {
  constructor (props) {
    super(props)
    // binder(this, [''])
  }

  componentDidMount () {}

  render () {
    return (
      <div className='outer-wrapper'>
        <div className='inner-wrapper'>
          {/* <div className='map-wrapper'>
              <GoogleMap />
            </div>
            <div className='events-list-wrapper'>
              <ListView list={{ gallery: FBdata.events }} />
            </div>
            <div className='galleries-list-wrapper'>
              <ListView list={{ gallery: FBdata.galleries }} />
            </div> */}
        </div>
        <style jsx>{`
          .outer-wrapper{}
          .inner-wrapper{}
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
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // onCheckIfMobile: () => dispatch(checkIfMobile()),
    // onGetVPDims: () => dispatch(getVPDims()),
    // onFetchFBdata: () => dispatch(fetchFBdata())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
