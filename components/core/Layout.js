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
import vhCheck from 'vh-check'

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
			infoOpen: false,
			height: 0,
			isDevice: false
		}
	}

	componentWillMount () {}

	componentDidMount () {
		const init = () => {
			if (typeof window !== 'undefined') {
				const { hasSeenIntro } = window.localStorage
				this.handleResize()
				window.addEventListener('resize', this.handleResize)
				if (this.splashWrapper) window.addEventListener('scroll', this.handleIntro)
				// this.setState({ hasSeenIntro })
				// this.props.onSetIntroSeen(hasSeenIntro)
				if (hasSeenIntro) {
					this.props.onSetIntroSeen(true)
					this.setState({ introTransComplete: true }, () => {
						if (!this.state.isClient) {
							this.setState({ isClient: true }, () => {
								this.forceUpdate()
							})
						}
					})
				}
			} else {
				setTimeout(init, 400)
			}
		}
		init()
		this.setHeaderTitle()
	}

	componentWillUnmount () {
		window.removeEventListener('resize', this.handleResize)
		window.removeEventListener('scroll', this.handleIntro)
	}

	componentDidUpdate (prevProps) {
		if (
			this.props.router.asPath !== this.props.router.asPath ||
			this.props.router.asPath !== this.state.route ||
			this.props.viewState !== prevProps.viewState
		) {
			this.setHeaderTitle()
		}
		if (this.props.introTransComplete !== prevProps.introTransComplete) {
			this.handleResize()
		}
		if (this.props.isMobile !== prevProps.isMobile) {
			this.setVPHeight()
		}
	}

	handleResize = () => {
		if ((this.props.isMobile && window.innerWidth > 1000) || (!this.props.isMobile && window.innerWidth < 1000)) {
			this.props.onCheckIfMobile()
		}
		this.setVPHeight()
		this.setState({ isDevice: typeof window.orientation !== 'undefined' })
	}

	setVPHeight = () => {
		if (this.props.isMobile || !this.state.isClient) {
			const VH = vhCheck()
			const height = VH.windowHeight
			// const height = `${window.innerHeight - VH.offset}px`
			if (this.state.height === 0 || this.state.height !== height) {
				this.setState({ height })
			}
		}
	}

	handleIntro = e => {
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

	setHeaderTitle = () => {
		const { router: { asPath } } = this.props
		this.setState({ route: asPath })
		if (asPath === '/') {
			this.setState({ headerTitle: 'galleries' })
		} else {
			this.setState({ headerTitle: 'links' })
		}
	}

	hoverTitleBar = bool => {
		this.setState({ titleBarHovered: bool })
	}

	handleMenuItemClick = itemTxt => {
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
			infoOpen,
			hoverQ,
			isClient,
			height,
			isDevice
		} = this.state

		return (
			<div className='Layout-outer' onClick={this.handleInfoExit}>
				<div className='landscape-placeholder'>
					<div className='placeholder-inner'>
						<ArtSquiggle placeholder />
					</div>
				</div>
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
								<MobileTitleBar
									setVPHeight={this.setVPHeight}
									height={height}
									setMenuOpen={this.setMenuOpen}
									handleClick={this.handleMenuItemClick}
								/>
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
									<span onClick={this.handleInfoClick} className='info-sec modal-title'>
										Denver's.Art
									</span>{' '}
									is the front page of Denver's art scene. A singular resource for presenting the best galleries and
									events, both obvious and obscure. Data sourced directly from Facebook into a platform designed to
									present elegantly what's going on -- where, when, here, now. No more needing to know what to 'like',
									who to ask, where to look. Welcome to Denver's Art.
								</div>
								<a className='info-sec mail-link' href='mailto:denversartscene@gmail.com'>
									<span>Reach out</span> if you think you'd like to be included in the project.
								</a>
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
						overflow: hidden;
						position: absolute;
						top: 0;
						left: 0;
						width: 100vw;
						overflow-y: hidden;
					}
					.wrapper,
					.main-sec,
					.Layout-outer,
					.Layout-inner,
					.splash-wrapper {
						height: ${isMobile ? `${height}px` : '100vh'};
					}
					.splash-wrapper {
						z-index: 1000000001;
					}
					.splash-wrapper.transition {
						transform: translate3D(0, -100%, 0);
						transition: transform 1s ease-in-out;
					}
					.landscape-placeholder {
						display: none;
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
					.info-modal a:hover,
					.info-modal span:hover {
						color: var(--color-green);
						cursor: pointer;
					}
					.modal-title {
						color: var(--color-green);
					}
					.modal-title:hover,
					.mail-link span {
						color: var(--color-blue) !important;
					}
					.mail-link:hover {
						color: var(--color-green);
						cursor: pointer;
					}
					@media (orientation: landscape) and (max-height: 600px) {
						.Layout-inner {
							display: ${isDevice && isMobile ? 'none' : 'block'};
						}
						.landscape-placeholder {
							display: ${isDevice && isMobile ? 'flex' : 'none'};
							justify-content: center;
							align-items: center;
							width: 100vw;
							height: 80vh;
						}
						.placeholder-inner {
							position: relative;
							margin: auto;
							animation: rotate 5s linear infinite;
						}
					}
					@-webkit-keyframes rotate {
						from {
							-webkit-transform: rotate(0deg);
						}
						to {
							-webkit-transform: rotate(360deg);
						}
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
