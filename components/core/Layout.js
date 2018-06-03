// main wrapper component - layout, universal styles, etc.
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkIfMobile, getVPDims, fetchFBdata } from '../../lib/redux/actions'
import Header from './Header'
import Footer from './Footer'
import { binder } from '../../lib/_utils'

class App extends Component {
  constructor (props) {
    super(props)
    // binder(this, [])
  }
  componentDidMount () {

  }
  render () {
    const { FBdata, children } = this.props
    return (
      <div className='app-outer'>
        <div className='app-inner'>
          <header>
            <Header needsFbApproval />
          </header>
          <main>
            { children }
          </main>
          <footer>
            <Footer />
          </footer>
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
          header {}
          footer {}
          main {}
        `}</style>
        {/* <style dangerouslySetInnerHTML={{ __html: globalStyles }} /> */}
      </div>
    )
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired
}

// export default DataManager(App)
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
