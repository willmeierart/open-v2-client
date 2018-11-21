import React, { Component } from 'react'
import PropTypes from 'prop-types'
import vhCheck from 'vh-check'
import ListView from './ListView'
import ScrollBar from './ScrollBar'

export default class Mobile extends Component {
	constructor (props) {
		super(props)
		this.state = {
			canScroll: true,
			animateAmt: 0,
			viewPos: 'calc(100vh - 4em - 230px)',
			scrollBarPosY: 0,
			viewOpen: false,
			isDevice: false,
			height: 0,
			viewClosedAmt: 'calc(100vh - 4em - 100px)'
		}

		this.viewOpenAmt = '20px'
	}

	componentDidMount () {
		const init = () => {
			if (typeof window !== 'undefined') {
				// window.addEventListener('scroll', this.preventScroll)
				if (typeof window.orientation !== 'undefined') {
					this.setVPHeight()
					this.setState({ isDevice: true })
				}
			} else {
				setTimeout(init, 400)
			}
		}
		init()
	}

	componentDidUpdate (prevProps) {
		if (this.props.isDevice !== prevProps.isDevice) {
			this.setVPHeight()
		}
	}

	setVPHeight = () => {
		const VH = vhCheck()
		const height = VH.windowHeight
		if (this.state.height === 0 || this.state.height !== height) {
			this.setState({ height, viewClosedAmt: `calc(${height - 100}px - 4em)` })
		}
	}

	handleScrollBarPos = frac => {
		if (frac) {
			this.setState({ scrollBarPosY: frac })
		}
	}

	handleListScroll = (e, num) => {
		if (this.state.canScroll) {
			if (e) {
				if (e.target === this.list) {
					const scrollCap = e.target.scrollHeight - e.target.getBoundingClientRect().height
					const safeTop = e.target.scrollTop === 0 ? 0.01 : e.target.scrollTop
					const frac = parseFloat(safeTop / scrollCap)
					this.handleScrollBarPos(frac)
				}
			} else if (num) {
				const frac = (num - (window.innerHeight - 100) / 5) / window.innerHeight
				const listHeight = this.list.scrollHeight
				const top = frac * listHeight

				this.list.scrollTo({ top })
			}
		} else {
			if (e) this.preventScroll(e)
		}
	}

	preventScroll = e => {
		e.preventDefault()
		e.stopPropagation()
	}

	handleTitleBarClick = () => {
		const { viewOpen, viewClosedAmt } = this.state
		this.setState({
			viewPos: viewOpen ? viewClosedAmt : this.viewOpenAmt,
			viewOpen: !viewOpen
		})
	}

	render () {
		const {
			state: { viewPos, scrollBarPosY, viewOpen },
			props: { galleries, bodyHeight, children, setActiveMarker, activeMarker, introSeen, marqueeHeader }
		} = this

		// const Map = children[1]
		// const TitleBar = children[0]

		const dynamicHeight = bodyHeight
		// const dynamicHeight = height === 0 ? bodyHeight : height + 'px'

		return (
			<div className='outer-wrapper'>
				<div id='google-map'>{children}</div>
				<div className='inner-wrapper'>
					<div id='view'>
						<div id='scrollbar'>
							<ScrollBar isMobile introSeen yPos={scrollBarPosY} handleListScroll={this.handleListScroll} />
						</div>
						<div
							onClick={this.handleTitleBarClick}
							className='title-wrapper'
							ref={titleBar => {
								this.titleBar = titleBar
							}}
						>
							{this.props.marqueeHeader(this.setVPHeight)}
						</div>
						<div
							id='list-view'
							className='list-section'
							onScroll={e => {
								this.handleListScroll(e)
							}}
							ref={list => {
								this.list = list
							}}
						>
							<ListView
								list={galleries}
								setActiveMarker={setActiveMarker}
								activeID={activeMarker}
								listOpen={viewOpen}
								openList={this.handleTitleBarClick}
								isMobile
							/>
						</div>
					</div>
				</div>
				<style jsx>{`
					.outer-wrapper {
						height: ${dynamicHeight};
						width: 100vw;
						display: flex;
						margin-top: 100px;
						position: relative;
					}
					#google-map {
						position: absolute;
						width: 100vw;
						height: 100%;
						display: flex;
						background-color: var(--color-green);
					}
					.inner-wrapper {
						width: 100vw;
						display: flex;
						flex-direction: column;
						position: absolute;
						transform: translateY(${viewPos});
						will-change: transform;
						transition: transform 500ms;
						transition-timing-function: ease-out;
					}
					#view {
						height: calc(${dynamicHeight} - 70px);
						width: 100vw;
						min-height: ${dynamicHeight};
						position: relative;
						background-color: var(--color-blue);
					}
					#scrollbar {
						position: absolute;
						right: 0;
						height: ${dynamicHeight};
						top: 4em;
						z-index: ${introSeen ? '10000000' : '-1'};
					}
					.title-wrapper {
						background: black;
						height: 4em;
						display: flex;
						flex-direction: column;
						justify-content: center;
						cursor: pointer;
					}
					.list-section {
						width: calc(100vw - 20px);
						height: calc(${dynamicHeight} - 80px);
						overflow: scroll;
						-webkit-overflow-scrolling: touch;
					}
					.list-section::-webkit-scrollbar {
						display: none;
					}
				`}</style>
			</div>
		)
	}
}

Mobile.propTypes = {
	FBdata: PropTypes.objectOf(PropTypes.oneOfType([ PropTypes.object, PropTypes.arrayOf(PropTypes.object) ])),
	activeMarker: PropTypes.string,
	actualMapMarkers: PropTypes.arrayOf(PropTypes.object).isRequired,
	allMapMarkers: PropTypes.arrayOf(PropTypes.object).isRequired,
	bodyHeight: PropTypes.string.isRequired,
	galleries: PropTypes.arrayOf(PropTypes.object).isRequired,
	handleToggle: PropTypes.func.isRequired,
	introSeen: PropTypes.bool.isRequired,
	isMobile: PropTypes.bool.isRequired,
	mapMarkers: PropTypes.func.isRequired,
	onFetchFBdata: PropTypes.func.isRequired,
	onSetActiveMarker: PropTypes.func.isRequired,
	onSetActualMapMarkers: PropTypes.func.isRequired,
	onSetAllMapMarkers: PropTypes.func.isRequired,
	setActiveMarker: PropTypes.func.isRequired
}
