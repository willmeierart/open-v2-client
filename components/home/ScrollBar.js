import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { binder } from '../../lib/_utils'

class ScrollBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      origin: 'top',
      barPos: '0'
    }
    binder(this, ['setOrigin', 'scrollTheBar'])
  }

  componentDidMount () {
    this.setOrigin()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.origin !== prevState.origin || this.props.view !== prevProps.view) {

    }
  }

  setOrigin () {
    const { view } = this.props
    if (view === 'events') {
      this.setState({ origin: 'top' })
    } else {
      this.setState({ origin: 'bottom' })
    }
  }

  scrollTheBar () {
    const { percentScrolled } = this.props
    const baseHeight = window.innerHeight * 0.8
    const barPos = `${baseHeight * percentScrolled}vh`
    this.setState({ barPos })
  }

  render () {
    return (
      <div className='track'>
        <div className='bar' />
        <style jsx>{`
          .track{
            height: 100vh;
            width: 30px;
            background: yellow;
            position: relative;
          }
          .bar{
            height: 20vh;
            width: 30px;
            background: red;
            position: absolute;
            top: ${this.state.barPos};
          }
        `}</style>
      </div>
    )
  }
}

ScrollBar.propTypes = {}

export default ScrollBar
