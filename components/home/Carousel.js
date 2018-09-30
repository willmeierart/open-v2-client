import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { binder } from '../../lib/_utils'
import { Transition } from 'react-transition-group'

class Carousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeImageIdxA: 0,
      activeImageIdxB: 0,
      transition: false
    }
    binder(this, ['cycleImages'])
  }

  componentDidMount () {
    if (this.props.images.length > 1) {
      this.setState({ activeImageIdxB: this.props.images.length - 1 }, this.cycleImages)
    }
  }

  componentWillUnmount () {
    clearInterval(this.interVal)
  }

  cycleImages () {
    const { images } = this.props
    const max = images.length - 1
    this.interval = setInterval(() => {
      const { activeImageIdxA, activeImageIdxB } = this.state
      const nextIdx = idx => idx === max ? 0 : idx + 1
      const nextIdxA = nextIdx(activeImageIdxA)
      const nextIdxB = nextIdx(activeImageIdxB)
      this.setState({ activeImageIdxA: nextIdxA, activeImageIdxB: nextIdxB, transition: true }, () => {
        setTimeout(() => { this.setState({ transition: false }) })
      })
    }, 4000)
  }

  render () {
    const { images, height } = this.props
    const { activeImageIdxA, activeImageIdxB } = this.state
    const duration = 1000
    const defaultStyle = {
      opacity: 0
    }
    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1, transition: `opacity ${duration}ms ease-out` }
    }
    console.log(height)
    return (
      <div className='outer-wrapper'>
        <Transition in={!this.state.transition} timeout={duration}>
          { state => <div className='img a' style={{ ...defaultStyle, ...transitionStyles[state] }} /> }
        </Transition>
        <div className='img b' />
        <style jsx>{`
          .outer-wrapper {
            width: 100%;
            height: ${height}px;
            position: relative;
            border-size: border-box;
            border: 2px solid var(--color-green);
          }
          .img {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: middle;
          }
          .img.a {
            background-image: url('${images[activeImageIdxA]}');
            z-index: 2;
          }
          .img.b {
            background-image: url('${images[activeImageIdxB]}');
          }
          .inner-wrapper{}
        `}</style>
      </div>
    )
  }
}

Carousel.propTypes = {}

export default Carousel
