// main wrLayouter component - layout, universal styles, etc.
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkIfMobile, getVPDims, fetchFBdata, setViewState } from '../../lib/redux/actions'
import TitleBar from './TitleBar'
import MarqueeHeader from './MarqueeHeader'
import SplashIntro from '../home/SplashIntro'
import { binder } from '../../lib/_utils'

class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // splitScreen:
      headerTitle: 'events'
    }
    binder(this, ['handleIntro'])
  }
  componentDidMount () {
    window.addEventListener('scroll', this.handleIntro)
    this.setHeaderTitle()
  }

  handleIntro () {
    const SWBounds = this.splashWrapper.getBoundingClientRect()
    const conds = SWBounds.bottom <= 0
    if (conds) {
      this.setState({ introSeen: true }, () => {
        window.localStorage.setItem('hasSeenIntro', 'true')
        window.removeEventListener('scroll', this.handleIntro)
      })
    }
  }

  setHeaderTitle () {
    const { router: { route } } = this.props
    if (route === '/') {
      if (this.props.viewState === 'galleries') {
        this.setState({ headerTitle: 'galleries' })
      } else {
        this.setState({ headerTitle: 'events' })
      }
    } else {
      this.setState({ headerTitle: 'links' })
    }
  }

  render () {
    const { FBdata, children, onSetViewState, router: { route } } = this.props
    return (
      <div className='Layout-outer'>
        <div className='Layout-inner'>
          { !window.localStorage.hasSeenIntro && !this.state.introSeen &&
            <div className='splash-wrapper' ref={sw => { this.splashWrapper = sw }}>
              <SplashIntro />
            </div>
          }
          <header>
            <TitleBar title={this.state.headerTitle} setViewState={onSetViewState} url={route} needsFbLayout />
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
          header {}
          footer {}
          main {}
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
    FBdata: state.data.FBdata,
    viewState: state.ui.viewState
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCheckIfMobile: () => dispatch(checkIfMobile()),
    onGetVPDims: () => dispatch(getVPDims()),
    onFetchFBdata: () => dispatch(fetchFBdata()),
    onSetViewState: viewState => dispatch(setViewState(viewState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
