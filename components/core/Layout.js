import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkIfMobile, getVPDims, fetchFBdata, setViewState, setIntroSeen } from '../../lib/redux/actions'
import TitleBar from './TitleBar'
import MobileTitleBar from './MobileTitleBar'
import SplashIntro from '../home/SplashIntro'
import ArtSquiggle from '../assets/ArtSquiggle'
import { binder } from '../../lib/_utils'

class Layout extends Component {
	constructor (props) {
		super(props)
		this.state = {
			headerTitle: 'events',
			titleBarHovered: false,
			route: '/',
			hasSeenIntro: false, //disable intro,
			isClient: false,
			hoverQ: false,
			introTransComplete: false,
			menuOpen: false
		}
		binder(this, [ 'handleIntro', 'hoverTitleBar', 'handleMenuItemClick' ])
	}
	componentDidMount () {
		const init = () => {
			if (typeof window !== 'undefined') {
				this.setState({ isClient: true })
				const { hasSeenIntro } = window.localStorage
				this.props.onCheckIfMobile()
				window.addEventListener('resize', () => {
					if ((this.props.isMobile && window.innerWidth > 1000) || (!this.props.isMobile && window.innerWidth < 1000)) {
						this.props.onCheckIfMobile()
					}
				})
				if (this.splashWrapper) window.addEventListener('scroll', this.handleIntro)
				// this.setState({ hasSeenIntro })
				// this.props.onSetIntroSeen(hasSeenIntro)
				if (hasSeenIntro) {
					this.props.onSetIntroSeen(true)
					this.setState({ introTransComplete: true })
				}
			} else {
				setTimeout(init, 200)
			}
		}
		init()
		this.setHeaderTitle()
	}

	componentDidUpdate (prevProps, prevState) {
		if (
			this.props.router.asPath !== this.props.router.asPath ||
			this.props.router.asPath !== this.state.route ||
			this.props.viewState !== prevProps.viewState
		) {
			this.setHeaderTitle()
		}
		if (!this.hasSeenIntro && this.splashWrapper) {
			// window.addEventListener('scroll', this.handleIntro)
		}
	}

	handleIntro (e) {
		e.preventDefault()
		console.log(e)
		if (this.splashWrapper) {
			// const SWBounds = this.splashWrapper.getBoundingClientRect()
			// const conds = SWBounds.bottom <= 0
			// if (conds) {
			//   this.setState({ introSeen: true }, () => {
			window.localStorage.setItem('hasSeenIntro', 'true')
			window.removeEventListener('scroll', this.handleIntro)
			this.props.onSetIntroSeen(true)
			this.setState({ hasSeenIntro: true }, () => {
				setTimeout(() => {
					this.setState({ introTransComplete: true })
				}, 1000)
			})
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
		if (itemTxt === 'links' || itemTxt === 'info') {
			router.push(`/${itemTxt}`)
			return
		}
		router.push('/')
	}

	setMenuOpen = menuOpen => {
		this.setState({ menuOpen })
	}

	render () {
		const { children, isMobile, introSeen } = this.props
		const { headerTitle, titleBarHovered, hasSeenIntro, introTransComplete, menuOpen } = this.state
		return (
			<div className='Layout-outer'>
				<div className='Layout-inner'>
					{!introTransComplete && (
						<div
							onWheel={this.handleIntro}
							className={`${hasSeenIntro ? 'transition ' : ''} splash-wrapper`}
							ref={sw => {
								this.splashWrapper = sw
							}}
						>
							<SplashIntro isMobile={isMobile} handleIntro={this.handleIntro} />
						</div>
					)}

					<header
						onMouseEnter={() => {
							this.hoverTitleBar(true)
						}}
						onMouseLeave={() => {
							this.hoverTitleBar(false)
						}}
					>
						{!isMobile ? (
							<TitleBar isHovered={titleBarHovered} title={headerTitle} handleClick={this.handleMenuItemClick} />
						) : (
							<MobileTitleBar setMenuOpen={this.setMenuOpen} handleClick={this.handleMenuItemClick} />
						)}
					</header>
					<main>{children}</main>
					{!isMobile && (
						<div
							onMouseOver={() => {
								this.setState({ hoverQ: true })
							}}
							onMouseLeave={() => {
								this.setState({ hoverQ: false })
							}}
							className='q-mark'
						>
							<a href='/info'>{this.state.hoverQ ? <ArtSquiggle /> : '?'}</a>
						</div>
					)}
				</div>
				<style jsx global>{`
					header {
						position: fixed;
						top: 0;
						width: 100%;
						z-index: ${introSeen ? '1000000000' : '-1'};
					}
					body,
					html,
					.wrapper,
					.main-sec,
					.Layout-outer,
					.Layout-inner,
					.splash-wrapper {
						// overflow: ${!introSeen || menuOpen ? 'hidden' : 'scroll'};

						overflow: hidden;
					}
					.splash-wrapper {
						z-index: 1000000001;
					}
					.splash-wrapper.transition {
						transform: translate3D(0, -100%, 0);
						transition: transform 1s ease-in-out;
					}
					.q-mark {
						position: fixed;
						bottom: 0;
						right: 0;
						background: black;
						font-size: 2em;
						width: 1.25em;
						height: 1.25em;
						justify-content: center;
						align-items: center;
						cursor: pointer;
						display: ${introSeen ? 'flex' : 'none'};
					}
					.q-mark a {
						color: white;
					}
				`}</style>
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
