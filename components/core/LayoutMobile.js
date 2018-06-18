// main wrLayouter component - layout, universal styles, etc.
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkIfMobile, getVPDims, fetchFBdata } from '../../lib/redux/actions'
import TitleBar from './TitleBar'
import { binder } from '../../lib/_utils'

class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // splitScreen: 
    }
    // binder(this, [])
  }
  componentDidMount () {
    console.log(this.props)
  }
  render () {
    const { FBdata, children, url } = this.props
    return (
      <div className='Layout-outer'>
        <div className='Layout-inner'>
          <header>
            <TitleBar url={this.props.router.route} needsFbLayoutroval />
          </header>
          <main>
            { children }
          </main>
        </div>
        <style jsx global>{`
          a {
            {/* text-decoration: none; */}
            {/* color: inherit; */}
          }
          li {
            list-style: none;
          }
          html, body {
            {/* overflow: hidden!important;
            position: fixed!important; */}
          }
          body {
            height: 100vh;
            width: 100vw;
            box-sizing: border-box;
          }
        `}</style>
        {/* <style dangerouslySetInnerHTML={{ __html: globalStyles }} /> */}
      </div>
    )
  }
}

Layout.propTypes = {
  title: PropTypes.string
}

// export default DataManager(Layout)
function mapStateToProps (state) {
  return {
    isMobile: state.env.isMobile,
    dims: state.env.dims,
    FBdata: state.data.FBdata
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCheckIfMobile: () => dispatch(checkIfMobile()),
    onGetVPDims: () => dispatch(getVPDims()),
    onFetchFBdata: () => dispatch(fetchFBdata())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
