import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MarqueeHeader from './MarqueeHeader'
import { binder } from '../../lib/_utils'

class MobileMenu extends Component {
	constructor (props) {
		super(props)
		this.state = {
			inited: false
		}
		binder(this, [ 'renderMarquees' ])
	}

	componentDidMount () {
		this.setState({ inited: true })
	}

	handleClick (l) {
		this.props.handleClick(l)
	}

	renderMarquees () {
		return [ 'galleries', 'links' ].map((l, i) => (
			<div
				key={l}
				onClick={() => {
					this.props.handleClick(l)
				}}
				className='marquee-wrapper'
			>
				<MarqueeHeader isMobileMenu title={l} />
				<style jsx>{`
					.marquee-wrapper {
						background-color: ${i === 0 ? 'var(--color-blue) ' : 'var(--color-orange)'};
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						border-bottom: 10px solid black;
						cursor: pointer;
					}
				`}</style>
			</div>
		))
	}

	render () {
		console.log(this.props)
		return (
			<div className='outer-container'>
				<div className='inner-container'>
					<div className='main-wrapper'>{this.renderMarquees()}</div>
					<div
						className='faq'
						onClick={() => {
							this.props.handleClick('info')
						}}
					>
						<MarqueeHeader isFAQ isMobileMenu title='FAQ' />
					</div>
				</div>
				<style jsx>{`
					.outer-container {
						width: 100vw;
						margin-left: -10px;
						height: calc(100vh - 100px);
						transition: transform 800ms linear;
						transform: translateX(${!this.props.isOpen || !this.state.inited ? window.innerWidth : 0}px);
						box-sizing: content-box;
						border-left: 10px solid black;
					}
					.inner-container {
						display: flex;
						flex-direction: column;
						height: 100%;
					}
					.main-wrapper {
						display: flex;
						flex-direction: column;
						height: calc(100% - 4em);
					}
					.faq {
						height: 10vh;
						background-color: var(--color-yellow);
						display: flex;
						flex-direction: column;
						justify-content: center;
						cursor: pointer;
					}
				`}</style>
			</div>
		)
	}
}

MobileMenu.propTypes = {
	handleClick: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired
}

export default MobileMenu
