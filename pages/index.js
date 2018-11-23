import React, { Component } from 'react'
import Head from '../components/Head'
import Home from '../components/home'

export default class HomePage extends Component {
	render () {
		return (
			<div>
				<Head />
				<section>
					<Home
						isMobile={typeof window !== 'undefined' && (window.orientation !== undefined || window.innerWidth < 1000)}
					/>
				</section>
			</div>
		)
	}
}
