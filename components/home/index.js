import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
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
    const needsFbApproval = true
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
        <div className='notice'>
          { needsFbApproval && <div className='fb-notice'>
            <Link href='/fb'>
              <a>If you are with the Facebook Privacy Policy Auditing Team, please click here</a>
            </Link>
          </div> }
        </div>
        <style jsx>{`
        .notice {
          width: 100vw;
          height: 50px;
          background: red;
          position: absolute;
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-size: 1.5em;
          color: white;
          border-bottom: 1px solid red;
        }
        .header-inner:hover {
          background: white;
          color: red;
        }
        a {
          color: inherit;
          text-decoration: none;
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
