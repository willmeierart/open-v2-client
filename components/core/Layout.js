import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkIfMobile, getVPDims, fetchFBdata, setViewState, setIntroSeen } from '../../lib/redux/actions'
import TitleBar from './TitleBar'
import MobileTitleBar from './MobileTitleBar'
import SplashIntro from '../home/SplashIntro'
import ArtSquiggle from '../assets/ArtSquiggle'
import InfoX from '../assets/InfoX'
import Loader from 'react-loader'
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
			menuOpen: false,
			infoOpen: false
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
					console.log('resizing')
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
				setTimeout(init, 100)
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

	handleInfoClick = () => {
		this.setState({ infoOpen: !this.state.infoOpen })
	}

	handleInfoExit = e => {
		this.state.infoOpen && e.target.classList.value.indexOf('info-sec') === -1
			? this.setState({ infoOpen: false })
			: null
	}

	render () {
		const { children, isMobile, introSeen } = this.props
		const {
			headerTitle,
			titleBarHovered,
			hasSeenIntro,
			introTransComplete,
			menuOpen,
			infoOpen,
			hoverQ,
			isClient
		} = this.state
		return (
			<div className='Layout-outer' onClick={this.handleInfoExit}>
				<Loader color='#ddff00' loaded={isClient}>
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
								onClick={this.handleInfoClick}
							>
								{infoOpen ? <InfoX /> : hoverQ ? <ArtSquiggle /> : '?'}
							</div>
						)}
						{!isMobile &&
						infoOpen && (
							<div
								ref={infoModal => {
									this.infoModal = infoModal
								}}
								className='info-modal info-sec'
							>
								<div className='info-sec'>
									<span onClick={this.handleInfoClick} className='info-sec'>
										Denver's.Art
									</span>{' '}
									is the front page of Denver's art scene. A singular resource for presenting the best galleries and
									events, both obvious and obscure. Data sourced directly from the Facebook API on a platform designed
									to present elegantly what's going on -- where, when, here, now. No more needing to know what to
									'like', who to ask, where to look. Welcome to Denver's Art.
								</div>
								<div className='info-sec'>
									Reach out to{' '}
									<a target='_blank' className='info-sec' href='mailto:willmeierart@gmail.com'>
										willmeierart@gmail.com
									</a>{' '}
									if you think you'd like to be included in the project.
								</div>
							</div>
						)}
					</div>
				</Loader>

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
						// overflow: ${!introSeen || menuOpen || infoOpen ? 'hidden' : 'scroll'};

						overflow: hidden;
						position: absolute;
						top: 0;
						left: 0;
						width: 100vw;
						height: 100vh;
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
						color: white;
					}
					.info-modal {
						position: absolute;
						width: 70vw;
						min-height: 40vh;
						top: 20vh;
						left: 15vw;
						background: black;
						z-index: 99999999999;
						padding: 5vw;
						box-sizing: border-box;
						color: white;
						font-size: 2em;
					}
					.info-modal div {
						margin-bottom: 1em;
						line-height: 1.25em;
					}
					.info-modal a:hover, .info-modal span:hover {
						color: var(--color-green);
						cursor: pointer;
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
