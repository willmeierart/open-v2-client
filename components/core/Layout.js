// main wrLayouter component - layout, universal styles, etc.
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkIfMobile, getVPDims, fetchFBdata, setViewState } from '../../lib/redux/actions'
import TitleBar from './TitleBar'
import MobileTitleBar from './MobileTitleBar'
import MarqueeHeader from './MarqueeHeader'
import SplashIntro from '../home/SplashIntro'
import { binder } from '../../lib/_utils'

class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      headerTitle: 'events',
      titleBarHovered: false,
      route: '/',
      hasSeenIntro: false
    }
    binder(this, ['handleIntro', 'hoverTitleBar', 'handleMenuItemClick'])
  }

  componentDidMount () {
    console.log('did mount')
    const init = () => {
      if (typeof window !== 'undefined') {
        const { hasSeenIntro } = window.localStorage
        this.props.onCheckIfMobile()
        window.addEventListener('resize', this.props.onCheckIfMobile)
        if (this.splashWrapper) window.addEventListener('scroll', this.handleIntro)
        this.setState({ hasSeenIntro })
      } else {
        setTimeout(init, 200)
      }
    }
    init()
    this.setHeaderTitle()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.router.asPath !== this.props.router.asPath ||
      this.props.router.asPath !== this.state.route ||
      (this.props.viewState !== prevProps.viewState)
    ) {
      this.setHeaderTitle()
    }
  }

  handleIntro () {
    if (this.splashWrapper) {
      const SWBounds = this.splashWrapper.getBoundingClientRect()
      const conds = SWBounds.bottom <= 0
      if (conds) {
        this.setState({ introSeen: true }, () => {
          window.localStorage.setItem('hasSeenIntro', 'true')
          window.removeEventListener('scroll', this.handleIntro)
        })
      }
    }
  }

  setHeaderTitle () {
    const { router: { asPath } } = this.props
    this.setState({ route: asPath })
    if (asPath === '/') {
      if (this.props.viewState === 'galleries') {
        this.setState({ headerTitle: 'galleries' })
      } else {
        this.setState({ headerTitle: 'events' })
      }
    } else {
      this.setState({ headerTitle: 'links' })
    }
  }

  hoverTitleBar (bool) {
    this.setState({ titleBarHovered: bool })
  }

  handleMenuItemClick (itemTxt) {
    const { router, onSetViewState } = this.props
    console.log(router, itemTxt)
    router.push('/')
    router.events.on('routeChangeComplete', () => { onSetViewState(itemTxt) })
  }

  render () {
    const { FBdata, children, onSetViewState, router: { route }, isMobile } = this.props
    const { headerTitle, titleBarHovered, hasSeenIntro } = this.state
    return (
      <div className='Layout-outer'>
        <div className='Layout-inner'>
          { !hasSeenIntro && !this.state.introSeen &&
            <div className='splash-wrapper' ref={sw => { this.splashWrapper = sw }}>
              <SplashIntro />
            </div>
          }
          <header onMouseEnter={() => { this.hoverTitleBar(true) }} onMouseLeave={() => { this.hoverTitleBar(false) }}>
           { !isMobile
            ? <TitleBar isHovered={titleBarHovered}
              title={headerTitle}
              setViewState={onSetViewState}
              url={route} needsFbLayout
              handleClick={this.handleMenuItemClick} />
            : <MobileTitleBar />
           }
          </header>
          <main>
            { children }
          </main>
        </div>
        <style jsx global>{`
          header {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000000000;
          }
          body {
            overflow: ${hasSeenIntro ? 'hidden' : 'scroll'};
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
