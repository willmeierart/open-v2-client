import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkIfMobile, getVPDims, fetchFBdata, setViewState, setIntroSeen } from '../../lib/redux/actions'
import TitleBar from './TitleBar'
import MobileTitleBar from './MobileTitleBar'
import SplashIntro from '../home/SplashIntro'
import { binder } from '../../lib/_utils'

class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      headerTitle: 'events',
      titleBarHovered: false,
      route: '/',
      hasSeenIntro: true, //disable intro,
      isClient: false
    }
    binder(this, ['handleIntro', 'hoverTitleBar', 'handleMenuItemClick'])
  }
  componentDidMount () {
    const init = () => {
      if (typeof window !== 'undefined') {
        this.setState({ isClient: true })
        // const { hasSeenIntro } = window.localStorage
        this.props.onCheckIfMobile()
        window.addEventListener('resize', () => {
          if (
            (this.props.isMobile && window.innerWidth > 1000) || 
            (!this.props.isMobile && window.innerWidth < 1000)
          ) {
            this.props.onCheckIfMobile()
          }
        })
        if (this.splashWrapper) window.addEventListener('scroll', this.handleIntro)
        // this.setState({ hasSeenIntro })
        // this.props.onSetIntroSeen(hasSeenIntro)
        this.props.onSetIntroSeen(true)
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
      // const SWBounds = this.splashWrapper.getBoundingClientRect()
      // const conds = SWBounds.bottom <= 0
      // if (conds) {
      //   this.setState({ introSeen: true }, () => {
          window.localStorage.setItem('hasSeenIntro', 'true')
          window.removeEventListener('scroll', this.handleIntro)
          this.props.onSetIntroSeen(true)
    //     })
    //   }
    }
  }

  setHeaderTitle () {
    const { router: { asPath } } = this.props
    this.setState({ route: asPath })
    if (asPath === '/') {
      this.setState({ headerTitle: 'galleries' })
    } else {
      this.setState({ headerTitle: 'links' })
    }
  }

  hoverTitleBar (bool) {
    this.setState({ titleBarHovered: bool })
  }

  handleMenuItemClick (itemTxt) {
    const { router } = this.props
    if (itemTxt === 'links') {
      router.push('/links')
      return
    } 
    router.push('/')
  }

  render () {
    const { children, isMobile, introSeen } = this.props
    const { headerTitle, titleBarHovered, hasSeenIntro } = this.state
    return (
      <div className='Layout-outer'>
        <div className='Layout-inner'>
          { !hasSeenIntro && !this.state.introSeen &&
            <div className='splash-wrapper' ref={sw => { this.splashWrapper = sw }}>
              <SplashIntro />
            </div>
          }
          { introSeen && <header onMouseEnter={() => { this.hoverTitleBar(true) }} onMouseLeave={() => { this.hoverTitleBar(false) }}>
            { !isMobile
              ? <TitleBar isHovered={titleBarHovered} title={headerTitle} handleClick={this.handleMenuItemClick} />
              : <MobileTitleBar handleClick={this.handleMenuItemClick} />
            }
          </header> }
          <main>
            { children }
          </main>
          <div className='q-mark'><a>?</a></div>
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
          .q-mark {
            position: fixed;
            bottom: 0;
            right: 0;
            background: black;
            font-size: 2em;
            width: 1.25em;
            height: 1.25em;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          .q-mark a {
            color: white;
          }
        `}</style>
        {/* <style dangerouslySetInnerHTML={{ __html: globalStyles }} /> */}
      </div>
    )
  }
}

// export default DataManager(Layout)

function mapStateToProps (state) {
  return {
    isMobile: state.env.isMobile,
    dims: state.env.dims,
    FBdata: state.data.FBdata,
    introSeen: state.env.introSeen
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCheckIfMobile: () => dispatch(checkIfMobile()),
    onGetVPDims: () => dispatch(getVPDims()),
    onFetchFBdata: () => dispatch(fetchFBdata()),
    onSetIntroSeen: bool => dispatch(setIntroSeen(bool))
  }
}

Layout.propTypes = {
  FBdata: PropTypes.object,
  title: PropTypes.string,
  introSeen: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  onCheckIfMobile: PropTypes.func.isRequired,
  onFetchFBdata: PropTypes.func.isRequired,
  onGetVPDims: PropTypes.func.isRequired,
  onSetIntroSeen: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
