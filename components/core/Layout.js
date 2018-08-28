// main wrLayouter component - layout, universal styles, etc.
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
      hasSeenIntro: false
    }
    binder(this, ['handleIntro', 'hoverTitleBar', 'handleMenuItemClick'])
  }

  componentDidMount () {
    const init = () => {
      if (typeof window !== 'undefined') {
        const { hasSeenIntro } = window.localStorage
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
        this.setState({ hasSeenIntro })
        this.props.onSetIntroSeen(hasSeenIntro)
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
          this.props.onSetIntroSeen(true)
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
    if (itemTxt === 'links') {
      router.push('/links')
      return
    } 
    router.push('/')
    router.events.on('routeChangeComplete', () => { onSetViewState(itemTxt) })
  }

  render () {
    const { children, onSetViewState, router: { route }, isMobile, introSeen } = this.props
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
              ? <TitleBar isHovered={titleBarHovered}
                title={headerTitle}
                setViewState={onSetViewState}
                url={route} needsFbLayout
                handleClick={this.handleMenuItemClick} />
              : <MobileTitleBar handleClick={this.handleMenuItemClick} />
            }
          </header> }
          <main>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="38.686" height="33.311" viewBox="0 0 38.686 33.311"><path d="M27.42,2.789A18.186,18.186,0,0,0,13.03.656C8.086,2.1,2.834,7.1.812,12.3c-2.478,6.375.759,13.008,9.115,18.679a16.749,16.749,0,0,0,9.1,2.329,23.207,23.207,0,0,0,9.906-2.224c3.6-1.713,5.441-4.358,5.618-8.086.147-3.139-.842-4.593-2.37-6.451a2.3,2.3,0,1,0-3.554,2.919c1.192,1.451,1.4,1.829,1.328,3.315-.094,2.005-.935,3.168-3,4.149-5.377,2.555-11.685,2.115-14.448.242C8.8,24.659,2.911,19.6,5.1,13.97c1.5-3.863,5.637-7.855,9.216-8.9A13.648,13.648,0,0,1,25.082,6.751a19.679,19.679,0,0,1,9.059,12.4,2.3,2.3,0,0,0,4.489-1.011A24.37,24.37,0,0,0,27.42,2.789Z"/></svg> */}
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

Layout.propTypes = {
  title: PropTypes.string
}

// export default DataManager(Layout)

function mapStateToProps (state) {
  return {
    isMobile: state.env.isMobile,
    dims: state.env.dims,
    FBdata: state.data.FBdata,
    viewState: state.ui.viewState,
    introSeen: state.env.introSeen
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCheckIfMobile: () => dispatch(checkIfMobile()),
    onGetVPDims: () => dispatch(getVPDims()),
    onFetchFBdata: () => dispatch(fetchFBdata()),
    onSetViewState: viewState => dispatch(setViewState(viewState)),
    onSetIntroSeen: bool => dispatch(setIntroSeen(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
