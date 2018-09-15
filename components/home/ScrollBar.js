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
    if (this.props.yPos !== prevProps.yPos) {

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
    const { yPos } = this.props
    const baseHeight = window.innerHeight * 0.8 - 100
    const barPos = `${baseHeight * yPos}vh`
    this.setState({ barPos })
  }

  render () {
    const { yPos } = this.props
    const baseHeight = window.innerHeight * 0.8 - 100
    const barPos = `${baseHeight * yPos}px`
    const width = this.props.isMobile ? '20px' : '30px'
    // console.log(barPos, yPos)
    return (
      <div className='track'>
        <div className='bar' />
        <style jsx>{`
          .track{
            height: 100vh;
            width: ${width};
            background: yellow;
            position: relative;
          }
          .bar{
            height: 20vh;
            width: ${width};
            background: red;
            position: absolute;
            top: ${barPos};
          }
        `}</style>
      </div>
    )
  }
}

ScrollBar.propTypes = {
  viewState: PropTypes.string,
  yPos: PropTypes.number.isRequired,
  isMobile: PropTypes.bool
}

export default ScrollBar
