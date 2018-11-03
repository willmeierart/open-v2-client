import React, { Component } from 'react'
import { connect } from 'react-redux'
import Head from '../components/Head'
import Home from '../components/home'

export default class HomePage extends Component {
	constructor (props) {
		super(props)
	}
	render () {
		return (
			<div>
				<Head title='Home' />
				<section>
					<Home
						isMobile={typeof window !== 'undefined' && (window.orientation !== undefined || window.innerWidth < 1000)}
					/>
				</section>
			</div>
		)
	}
}
