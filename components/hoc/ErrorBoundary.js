import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch (error, info) {
    this.setState({ hasError: true })
    console.log(error, info)
  }

  render () {
    if (this.state.hasError) {
      return <h1>¯\_(ツ)_/¯</h1>
    }
    return this.props.children
  }
}
