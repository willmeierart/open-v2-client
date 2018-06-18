import React, { Component } from 'react'
import { binder } from '../../lib/_utils'

export default function Boilerplate(ComposedComponent) {
  class WrappedComponent extends Component {
    constructor (props) {
      super(props)
      this.styles = {
        events: {},
        galleries: {}
      }
    }
    componentDidMount() { }
    render() {
      return (
        <ComposedComponent mapStyles={this.styles} {...this.props} />
      )
    }
  }
  return WrappedComponent
}
