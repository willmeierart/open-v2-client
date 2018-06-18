import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { binder } from '../../lib/_utils'
import MapStyleManager from './MapStyleManager'

class GoogleMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      style: this.props.mapStyles[this.props.view]
    }
    // binder(this, [''])
  }

  componentDidMount () {}

  componentDidUpdate (prevProps) {
    if (this.props.view !== prevProps.view) {
      this.setState({ style: this.props.mapStyles[this.props.view] })
      // animate func?
    }
  }

  render () {
    return (
      <div className='outer-wrapper'>
        <div className='inner-wrapper'></div>
        <style jsx>{`
          .outer-wrapper{}
          .inner-wrapper{}
        `}</style>
      </div>
    )
  }
}

GoogleMap.propTypes = {}

export default MapStyleManager(GoogleMap)
