import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MorphReplace } from 'react-svg-morph'
import { Animate } from 'react-move'
import { combine, separate, interpolate } from 'flubber'
import Hamburger, { hamburgerPaths, testPath } from '../assets/Hamburger'
import LeftArrow, { arrowPath } from '../assets/LeftArrow'
import SVGSurface from '../animation/SVGSurface'

export default class MobileNavIcon extends Component {
	shouldComponentUpdate (nextProps) {
		if (nextProps.menuIsOpen !== this.props.menuIsOpen) return true
		return false
	}

	render () {
		const test = true

		const { menuIsOpen, handleClick } = this.props
		const combiner = combine(hamburgerPaths, arrowPath, { single: true })
		// const combiner = combine(hamburgerPaths, arrowPath)
		const separator = separate(arrowPath, hamburgerPaths, { single: true })
		// const separator = separate(arrowPath, hamburgerPaths)
		// const interpolator = test ? interpolate(arrowPath, hamburgerPaths[1]) : this.props.menuIsOpen ? combiner : separator
		const interpolator = !menuIsOpen
			? interpolate(arrowPath, hamburgerPaths[1], { maxSegmentLength: 1 })
			: interpolate(hamburgerPaths[1], arrowPath, { maxSegmentLength: 1 })

		const easeInExp = t => Math.pow(2, 10 * t - 10)

		return (
			<div className='outer-container'>
				<div onClick={handleClick} className='inner-container'>
					{/* <MorphReplace
					width={menuIsOpen ? 75 : 31}
					height={menuIsOpen ? 30 : 23}
					style={{ fill: 'DDFF00', overflow: 'visible' }}
					viewBox='0 0 98 38'
					preserveAspectRatio='xMinYMid meet'
					rotation={menuIsOpen ? 'counterclock' : 'clockwise'}
				>
					{menuIsOpen ? <LeftArrow key='arrow' /> : <Hamburger key='burger' />}
				</MorphReplace> */}
					<SVGSurface view={menuIsOpen ? [ 75, 30 ] : [ 31, 23 ]} trbl={[ 10, 10, 10, 10 ]}>
						{/* <path fill='#DDFF00' d={hamburgerPaths[0]} /> */}
						<Animate
							start={{ d: interpolator(1), opacity: 1 }}
							enter={{ timing: { duration: 1000 } }}
							update={{
								d: interpolator,
								timing: { duration: 500, ease: easeInExp },
								opacity: menuIsOpen ? 0 : 1,
								// slide: {
								// 	a: `translate3D(${menuIsOpen ? '-50px' : 0},0,0)`
								// },
								style: {
									transform: `translate3D(${menuIsOpen ? '-50px' : 0},0,0)`,
									transition: 'transform .75s'
								}
							}}
						>
							{state => (
								<React.Fragment>
									<path fill='#DDFF00' {...state} d={hamburgerPaths[0]} style={{ transform: `translate3D(${menuIsOpen ? '-20px' : 0},${menuIsOpen ? '9px' : 0},0)`, transition: 'opacity .5s, transform .75s' }} />
									<path fill='#DDFF00' {...state} opacity={1} />
									<path fill='#DDFF00' {...state} d={hamburgerPaths[2]} style={{ transform: `translate3D(${menuIsOpen ? '-20px' : 0},${menuIsOpen ? '-9px' : 0},0)`, transition: 'opacity .5s, transform .75s' }} />
								</React.Fragment>
							)}
						</Animate>
						{/* <path fill='#DDFF00' d={hamburgerPaths[2]} /> */}
					</SVGSurface>
				</div>
				<style jsx>{`
					.outer-container {
						margin-right: 3em;
						margin-bottom: 1em;
					}
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
