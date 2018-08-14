import React, { Component } from 'react'
import ViewMobile from './ViewMobile'
import ViewDesktop from './ViewDesktop'

export default class Home extends Component {
  render () {
    return <div>{ this.props.isMobile ? <ViewMobile /> : <ViewDesktop /> }</div>
  }
}

Home.propTypes = {}
