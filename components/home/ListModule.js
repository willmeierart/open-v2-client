import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Expand from 'react-expand-animated'
import moment from 'moment'
import Plus from '../assets/plus'
import Minus from '../assets/minus'
import LinkOut from '../assets/LinkOut'
import FBEventsPlugin from './FBEventsPlugin'
import { MorphReplace } from 'react-svg-morph'

export default class ListModule extends Component {
	constructor (props) {
		super(props)
		this.state = {
			isOpen: false,
			scrollBarActual: false,
			xAmt: 0,
			yAmt: 0,
			scrollBarPos: 0,
			shouldAnimate: true,
			noScrollBar: false,
			imgHeight: 0,
			openDelay: false,
			showPlus: true
		}
	}

	componentDidMount () {
		if (this.props.shouldOpen) {
			this.handleExpand(true)
		}
	}

	componentDidUpdate (prevProps) {
		if (prevProps.shouldOpen !== this.props.shouldOpen) {
			if (this.props.shouldOpen === false) {
				this.handleExpand(false)
			} else {
				this.handleExpand(true)
			}
		}
	}

	shouldComponentUpdate (nextProps, nextState) {
		if (this.state !== nextState || this.props.shouldOpen !== nextProps.shouldOpen) {
			return true
		} else {
			return false
		}
	}

	manualExpand = () => {
		if (this.props.data.location) {
			this.props.setActiveMarker(this.props.data.id)
		}
		this.handleExpand()
	}

	handleExpand = force => {
		this.setState({ isOpen: force !== undefined ? force : !this.state.isOpen }, () => {
			if (this.state.isOpen) {
				this.setState({ imgHeight: this.descripBox.getBoundingClientRect().width, showPlus: false })
				if (this.descripBox.scrollHeight < this.descripBoxInner.scrollHeight) {
					if (this.state.shouldAnimate) {
						const oX = this.expBtn.getBoundingClientRect().x
						const oY = this.expBtn.getBoundingClientRect().y
						const dX = this.scrollBar.getBoundingClientRect().x
						const dY = this.scrollBar.getBoundingClientRect().y

						const xAmt = dX - oX + 6
						const yAmt = dY - oY

						this.setState(
							{
								xAmt,
								yAmt
							},
							() => {
								setTimeout(() => {
									this.setState({ scrollBarActual: true, shouldAnimate: false })
								}, 900)
							}
						)
					}
				} else {
					this.setState({ noScrollBar: true, openDelay: false })
				}
			} else {
				this.setState({ scrollBarActual: false, shouldAnimate: true })
				setTimeout(() => {
					this.setState({ openDelay: true })
				}, 50)
				setTimeout(() => {
					this.setState({ showPlus: true })
				}, 1000)
			}
		})
	}

	handleScroll = e => {
		if (this.state.scrollBarActual) {
			const scrollCap = e.target.scrollHeight - e.target.getBoundingClientRect().height
			const safeTop = e.target.scrollTop === 0 ? 1 : e.target.scrollTop
			const frac = parseFloat((safeTop / scrollCap).toFixed(3))
			const scrollBarPos = frac * (this.descripBox.getBoundingClientRect().height - 25)
			this.setState({ scrollBarPos, shouldAnimate: false })
		} else {
			e.preventDefault()
		}
	}

	parseDate = d => {
		const momentVersion = moment(d, moment.ISO_8601)
		const time = momentVersion.format('h:mm A')
		const date = momentVersion.format('MMMM Do')
		return {
			date,
			time
		}
	}

	renderGalleryContent = data => {
		const moduleWidth = this.descripBox ? this.descripBox.getBoundingClientRect().width : 200
		return (
			<div className='expanded-content'>
				<div
					ref={el => {
						this.descripBox = el
					}}
					className='descrip-outer'
				>
					<div
						ref={el => {
							this.scrollBar = el
						}}
						className='scrollbar-minus'
					>
						{!this.state.noScrollBar && <Minus />}
					</div>
					<div
						ref={el => {
							this.descripBoxInner = el
						}}
						onScroll={this.handleScroll}
						className='descrip-inner'
					>
						{data.about ? data.about : data.description}
					</div>
				</div>
				{data.site && (
					<div className='site-link'>
						<a href={data.site}>
							{data.site.indexOf('//') !== -1 ? data.site.split('/')[2] : data.site}
							<LinkOut />
						</a>
					</div>
				)}
				{data.email && (
					<div className='website'>
						<a href={`mailto:${data.email}`}>{data.email}</a>
					</div>
				)}
				<div className='img-events-wrapper'>
					<FBEventsPlugin ID={data.id} width={moduleWidth} />
				</div>
				<style jsx>{`
					.expanded-content {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						margin-top: 1em;
					}
					.descrip-outer {
						margin-bottom: 1em;
						margin-right: .5em;
						height: ${typeof data.description !== 'undefined'
							? data.description.length > 600 ? data.description.length / 100 + 'em' : 'fit-content'
							: '6em'};
						line-height: 1.5em;
						position: relative;
					}
					.descrip-inner {
						overflow: ${this.state.scrollBarActual ? 'scroll' : 'hidden'};
						width: 100%;
						height: 100%;
						overflow-wrap: break-word;
						padding-right: 1em;
						box-sizing: border-box;
						white-space: pre-line;
					}
					.scrollbar-minus {
						transform: rotate(90deg);
						position: absolute;
						top: ${this.state.scrollBarPos}px;
						right: -1em;
						visibility: ${!this.state.scrollBarActual && 'hidden'};
					}
					.img-events-wrapper {
						align-self: flex-start;
						margin-bottom: 2em;
						overflow: hidden;
					}
					.img-wrapper {
						height: 100%;
						object-fit: cover;
					}
					img {
						width: 100%;
						height: 100%;
					}
					a:hover {
						color: var(--color-green);
					}
					.site-link,
					.site-link a {
						display: flex;
					}
				`}</style>
			</div>
		)
	}

	render () {
		const { data, listOpen, openList } = this.props
		const { isOpen, xAmt, yAmt, noScrollBar, scrollBarActual } = this.state
		console.log('isOpen: ', isOpen)
		return (
			<div
				ref={el => {
					this.container = el
				}}
				className='outer-container'
				id={data.id}
				onClick={() => {
					!isOpen ? this.handleExpand(true) : null
				}}
			>
				{data ? (
					<div className='inner-container'>
						<div
							ref={el => {
								this.expBtn = el
							}}
							onClick={this.manualExpand}
							className='expand-btn'
						>
							{noScrollBar ? (
								<MorphReplace
									width={25}
									height={25}
									style={{
										fill: '#008f7e',
										overflow: 'visible'
									}}
									viewBox='0 0 25 25'
									preserveAspectRatio='xMinYMid meet'
									rotation='none'
								>
									{this.state.openDelay ? <Plus key='plus' /> : <Minus key='minus' />}
								</MorphReplace>
							) : !this.state.showPlus ? (
								<Minus />
							) : (
								<Plus />
							)}
						</div>
						{!this.state.showPlus &&
						!noScrollBar && (
							<div className='faux-minus'>
								<Minus />
							</div>
						)}
						<div className='title'>{data.name}</div>
						<div className='address'>{data.location ? data.location.street : ''}</div>
						<Expand duration={1000} open={isOpen}>
							{this.renderGalleryContent(data)}
						</Expand>
						{openList &&
						listOpen &&
						data.location && (
							<div className='see-on-map' onClick={openList}>
								See on map
							</div>
						)}
					</div>
				) : null}
				<style jsx>{`
					.outer-container {
						background: var(--color-lightblue);
						margin: 2em;
						padding: 2em;
						cursor: ${!isOpen ? 'pointer' : 'normal'};
						box-sizing: border-box;
					}
					.inner-container {
						position: relative;
					}
					.expand-btn {
						cursor: pointer;
						position: absolute;
						top: -1em;
						right: -1em;
						width: 1em;
						height: 1em;
						z-index: 2;
					}
					.faux-minus {
						position: absolute;
						top: -1em;
						right: -1em;
						width: 1em;
						height: 1em;
						animation-name: openMinus;
						// animation-name: ${isOpen ? 'closeMinus' : 'openMinus'};
						animation-duration: 1s;
						animation-fill-mode: forwards;
						animation-direction: ${isOpen ? 'initial' : 'reverse'};
						visibility: ${!this.state.shouldAnimate && 'hidden'};
					}
					.title {
						font-weight: 700;
						text-transform: uppercase;
					}
					.see-on-map {
						cursor: pointer;
					}
					@keyframes openMinus {
						0% {
							transform: rotate(0deg) translate3d(0, 0, 0);
							opacity: 1;
						}
						30% {
							transform: rotate(90deg) translate3d(0, 0, 0);
							opacity: 1;
						}
						99% {
							transform: rotate(90deg) translate3d(${yAmt}px, ${-xAmt}px, 0);
							opacity: 1;
						}
						100% {
							transform: rotate(90deg) translate3d(${yAmt}px, ${-xAmt}px, 0);
							opacity: 0;
						}
					}
					@keyframes closeMinus {
						0% {
							transform: rotate(90deg) translate3d(${yAmt}px, ${-xAmt}px, 0);
							opacity: 0;
						}
						1% {
							transform: rotate(90deg) translate3d(${yAmt}px, ${-xAmt}px, 0);
							opacity: 1;
						}
						30% {
							transform: rotate(90deg) translate3d(${yAmt}px, ${-xAmt}px, 0);
							opacity: 1;
						}
						100% {
							transform: rotate(0deg) translate3d(0, 0, 0);
							opacity: 1;
						}
					}
				`}</style>
			</div>
		)
	}
}

ListModule.propTypes = {
	activeID: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
	listOpen: PropTypes.bool,
	openList: PropTypes.func,
	setActiveMarker: PropTypes.func.isRequired,
	shouldOpen: PropTypes.bool
}
