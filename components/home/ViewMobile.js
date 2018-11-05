import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { binder } from '../../lib/_utils'
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
			isDevice: false
		}
		binder(this, [ 'handleListScroll', 'preventScroll', 'handleTitleBarClick', 'handleScrollBarPos' ])

		this.viewClosedAmt = 'calc(100vh - 4em - 100px)'

		this.viewOpenAmt = '20px'
	}

	componentDidMount () {
		console.log('mobile')
		const init = () => {
			if (typeof window !== 'undefined') {
				if (typeof window.orientation !== 'undefined') {
					console.log('isDevice')
					this.setState({ isDevice: true })
				}
			} else {
				setTimeout(init, 500)
			}
		}
		init()
	}

	handleScrollBarPos (frac) {
		if (frac) {
			this.setState({ scrollBarPosY: frac })
		}
	}

	handleListScroll (e) {
		if (this.state.canScroll) {
			if (e) {
				if (e.target === this.list) {
					const scrollCap = e.target.scrollHeight - e.target.getBoundingClientRect().height
					const safeTop = e.target.scrollTop === 0 ? 0.01 : e.target.scrollTop
					const frac = parseFloat(safeTop / scrollCap)
					this.handleScrollBarPos(frac)
				}
			}
		} else {
			if (e) this.preventScroll(e)
		}
	}

	preventScroll (e) {
		console.log('shouldnt be scrolling')
		e.preventDefault()
		e.stopPropagation()
	}

	handleTitleBarClick () {
		const { viewOpen } = this.state
		this.setState({
			viewPos: viewOpen ? this.viewClosedAmt : this.viewOpenAmt,
			viewOpen: !viewOpen
		})
	}

	deviceStyles () {
		return (
			<div>
				<style jsx global>{`
					html,
					body {
						overflow: hidden;
					}
				`}</style>
			</div>
		)
	}

	render () {
		const {
			state: { viewPos, scrollBarPosY, viewOpen, isDevice },
			props: { galleries, bodyHeight, children, setActiveMarker, activeMarker, introSeen }
		} = this

		const Map = children[1]
		const TitleBar = children[0]

		return (
			<div className='outer-wrapper'>
				<div id='google-map'>{Map}</div>
				<div className='inner-wrapper'>
					<div id='view'>
						<div id='scrollbar'>
							<ScrollBar isMobile yPos={scrollBarPosY} />
						</div>
						<div
							onClick={this.handleTitleBarClick}
							className='title-wrapper'
							ref={titleBar => {
								this.titleBar = titleBar
							}}
						>
							{TitleBar}
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
							/>
						</div>
					</div>
				</div>
				{isDevice && this.deviceStyles()}
				<style jsx>{`
					.outer-wrapper {
						min-height: ${bodyHeight};
						height: ${bodyHeight};
						width: 100vw;
						display: flex;
						margin-top: 100px;
						position: relative;
					}
					#google-map {
						position: absolute;
						width: 100vw;
						height: calc(100%);
						display: flex;
						background-color: var(--color-green);
					}
					.inner-wrapper {
						min-height: ${bodyHeight};
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
						height: calc(${bodyHeight} - 50px);
						width: 100vw;
						min-height: ${bodyHeight};
						position: relative;
						background-color: var(--color-blue);
					}
					#scrollbar {
						position: absolute;
						right: 0;
						height: ${bodyHeight};
						top: 4em;
						z-index: ${introSeen ? '1' : '-1'};
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
						overflow: scroll;
						height: 100%;
						-webkit-overflow-scrolling: touch;
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
