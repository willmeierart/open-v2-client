import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ScrollBar extends Component {
	constructor (props) {
		super(props)
		this.state = {
			barPos: '0',
			clickDown: 0,
			isDragging: false,
			baseHeight: 0
		}
	}

	// scrollTheBar = () => {
	// 	const { yPos } = this.props
	// 	const baseHeight = window.innerHeight * 0.8 - 100
	// 	const barPos = `${baseHeight * yPos}vh`
	// 	this.setState({ barPos })
	// }

	handleClick = e => {
		this.props.handleListScroll(null, e.clientY)
	}

	handleMouseDown = e => {
		this.setState({ isDragging: true }, () => {
			this.props.handleListScroll(null, e.clientY)
		})
	}

	handleMouseUp = e => {
		this.setState({ isDragging: false }, () => {
			this.props.handleListScroll(null, e.clientY)
		})
	}

	handleDrag = e => {
		if (this.state.isDragging) {
			this.props.handleListScroll(null, e.clientY)
		}
	}

	render () {
		const { yPos, introSeen, isMobile } = this.props
		const baseHeight = typeof window !== 'undefined' ? window.innerHeight * 0.8 - 100 : 0
		const barPos = `${baseHeight * yPos}px`
		const width = this.props.isMobile ? '20px' : '30px'
		return (
			<div
				className='track'
				onClick={this.handleClick}
				onMouseDown={this.handleMouseDown}
				onMouseMove={this.handleDrag}
				onMouseUp={this.handleMouseUp}
			>
				<div className='bar' />
				<style jsx>{`
					.track {
						height: 100vh;
						width: ${width};
						background: yellow;
						position: relative;
						cursor: grab;
					}
					.track:active {
						cursor: grabbing;
					}
					.bar {
						height: 20vh;
						width: ${width};
						background: var(--color-orange);
						position: absolute;
						top: ${barPos};
						z-index: inherit;
					}
				`}</style>
			</div>
		)
	}
}

ScrollBar.propTypes = {
	yPos: PropTypes.number.isRequired,
	isMobile: PropTypes.bool
}

export default ScrollBar
