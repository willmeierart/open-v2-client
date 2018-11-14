import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { binder } from '../../lib/_utils'
import ListView from './ListView'
import ScrollBar from './ScrollBar'

export default class Desktop extends Component {
	constructor (props) {
		super(props)
		this.state = {
			canScroll: true,
			scrollBarPosY: 0.00001,
			scrollBarWidth: 0,
			scrollBarLeft: 0,
			animate: false,
			animateAmt: 0
		}
	}

	componentDidMount () {
		const init = () => {
			if (typeof window !== 'undefined') {
				window.addEventListener('resize', () => {
					this.handleScrollBarPos()
				})
				this.handleScrollBarLeft()
			} else {
				setTimeout(init, 200)
			}
		}
		init()
	}

	handleScrollBarLeft = () => {
		this.setState({
			scrollBarLeft: this.state.scrollBarWidth === 0 ? window.innerWidth / 2 - 15 + 'px' : this.state.scrollBarWidth
		})
	}

	handleListScroll = (e, num) => {
		if (this.state.canScroll) {
			if (e) {
				if (e.target === this.list) {
					const scrollCap = e.target.scrollHeight - e.target.getBoundingClientRect().height
					const safeTop = e.target.scrollTop < 0.0001 ? 0.0001 : e.target.scrollTop
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
			if (e) this.preventScrollAndReset(e)
		}
	}

	handleScrollBarPos = frac => {
		if (this.state.scrollBarWidth !== `${window.innerWidth / 2 - 15}px`) {
			this.setState({ scrollBarWidth: `${window.innerWidth / 2 - 15}px` })
		}
		if (frac) {
			this.setState({ scrollBarPosY: frac })
		}
		this.handleScrollBarLeft()
	}

	preventScrollAndReset = e => {
		e.preventDefault()
	}

	render () {
		const {
			state: { animateAmt, scrollBarWidth, scrollBarPosY, scrollBarLeft },
			props: { introSeen, galleries, bodyHeight, activeMarker, children, setActiveMarker }
		} = this

		return (
			<div className='outer-wrapper'>
				<div id='scrollbar'>
					<ScrollBar introSeen yPos={scrollBarPosY} handleListScroll={this.handleListScroll} />
				</div>
				<div className='inner-wrapper'>
					<div id='galleries-view' className='view-sec'>
						<div className='left'>{children}</div>
						<div
							id='list-view'
							onScroll={e => {
								this.handleListScroll(e, 2)
							}}
							ref={list => {
								this.list = list
							}}
							className='right'
						>
							<ListView list={galleries} setActiveMarker={setActiveMarker} activeID={activeMarker} />
						</div>
					</div>
				</div>
				<style jsx>{`
					.outer-wrapper {
						min-height: ${bodyHeight};
						height: ${bodyHeight};
						width: 100vw;
						display: flex;
						margin-top: ${introSeen ? '100px' : 0};
						position: relative;
					}
					.inner-wrapper {
						min-height: ${bodyHeight};
						width: 100vw;
						display: flex;
						flex-direction: column;
						position: absolute;
						transform: translateY(${animateAmt + 'px'});
						will-change: transform;
						transition: transform 500ms;
						transition-timing-function: ease-out;
					}
					#events-view,
					#galleries-view {
						display: grid;
						grid-template-columns: 1fr 30px 1fr;
						height: ${bodyHeight};
						width: 100%;
						min-height: ${bodyHeight};
					}
					#scrollbar {
						position: fixed;
						left: ${scrollBarLeft};
						top: 100px;
						z-index: ${introSeen ? 100 : -1};
						display: ${introSeen ? 'initial' : 'none'};
					}
					.left,
					.right {
						overflow-x: hidden;
						overflow-y: scroll;
						height: ${bodyHeight};
					}
					#events-view .left,
					#galleries-view .left {
						background-color: var(--color-green);
					}
					#events-view .right,
					#galleries-view .right {
						background-color: var(--color-blue);
					}
					.left {
						grid-column: 1/2;
					}
					.right {
						grid-column: 3/4;
					}
				`}</style>
			</div>
		)
	}
}

Desktop.propTypes = {
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
