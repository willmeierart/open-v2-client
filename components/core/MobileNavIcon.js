import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MorphReplace } from 'react-svg-morph'
import Burger from '../assets/MobileNavSVGs/Burger'
import Arrow from '../assets/MobileNavSVGs/Arrow'

export default class MobileNavIcon extends Component {
	shouldComponentUpdate (nextProps) {
		if (nextProps.menuIsOpen !== this.props.menuIsOpen) return true
		return false
	}

	render () {
		const { menuIsOpen, handleClick } = this.props

		return (
			<div className='outer-container'>
				<div onClick={handleClick} className='inner-container'>
					<MorphReplace
						width={75}
						height={30}
						style={{
							fill: 'none',
							stroke: '#DDFF00',
							strokeWidth: 4.1324,
							strokeLinecap: 'round',
							strokeMiterlimit: 10
						}}
						viewBox='0 0 98 38'
						preserveAspectRatio='xMinYMid meet'
						rotation='none'
					>
						{menuIsOpen ? <Arrow key='arrow' /> : <Burger key='burger' />}
					</MorphReplace>
				</div>
				<style jsx>{`
					.inner-container {
						cursor: pointer;
						overflow: visible;
					}
				`}</style>
			</div>
		)
	}
}

MobileNavIcon.propTypes = {
	menuIsOpen: PropTypes.bool.isRequired,
	handleClick: PropTypes.func.isRequired
}
