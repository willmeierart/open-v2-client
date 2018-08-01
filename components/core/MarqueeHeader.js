import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontWyler from '../magic/FontWyler'
import { binder } from '../../lib/_utils'

class MarqueeHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      wdColor: 'var(--color-green)'
    }
    this.wordStyles = {
      padding: '.125em 1em',
      display: 'inline-block',
      fontSize: '3em',
      fontFamily: 'Art-Sans'
    }
    binder(this, ['renderWordDivs', 'setWdStyleColor'])
  }

  componentDidMount () {
    this.setWdStyleColor()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.title !== this.props.title) {
      this.setWdStyleColor()
    }
  }

  setWdStyleColor () {
    const { title } = this.props
    let color = 'var(--color - lightblue)'
    switch (title) {
      case 'events':
        color = 'var(--color-green)'
        break
      case 'galleries':
        color = 'var(--color-blue)'
        break
      case 'links':
        color = 'var(--color-orange)'
        break
    }
    this.setState({ wdColor: color })
  }

  renderWordDivs () {
    const outerWidth = this.outer.getBoundingClientRect().width
    const innerWidth = this.word.getBoundingClientRect().width
    const arr = []
    // console.log(outerWidth, innerWidth)
    if (innerWidth > 0) {
      const num = Math.ceil(outerWidth / innerWidth)
      // console.log(num);
      for (let i = 0; i < num * 2; i++) {
        arr.push(this.props.title)
      }
    }
    return arr.map((wd, i) => {
      return (
        <div key={i} className='word' style={ this.wordStyles }>
          <FontWyler phrase={wd} />
          <style jsx>{`
            .word {
              animation: marquee${i + 2} 3s linear infinite;
              color: ${this.state.wdColor};
              animation-delay: ${(i + 1) * 3};
            }
            @keyframes marquee${i + 2} {
              from {
                transform: translateX(0%);
              } to {
                transform: translateX(-100%);
              }
            }
          `}</style>
        </div>
      )
    })
  }

  render () {
    return (
      <div ref={outer => { this.outer = outer }} className='outer-container'>
        <div className='inner-container'>
          <div ref={word => { this.word = word }} className='word' style={ this.wordStyles }>{ this.props.title }</div>
          { this.outer && this.word && this.renderWordDivs() }
        </div>
        <style jsx>{`
        .outer-container {
          overflow: hidden;
          white-space: nowrap;
          width: 100vw;
        }
        .inner-container {
          display: flex;
        }
        .word {
          animation: marquee 3s linear infinite;
          color: ${this.state.wdColor};
        }
        @keyframes marquee {
          from {
            transform: translateX(0%);
          } to {
            transform: translateX(-100%);
          }
        }
      }
      `}</style>
      </div>
    )
  }
}

MarqueeHeader.propTypes = {}

export default MarqueeHeader
