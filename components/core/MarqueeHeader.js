import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontWyler from '../magic/FontWyler'
import { binder } from '../../lib/_utils'

class MarqueeHeader extends Component {
  constructor (props) {
    super(props)
    binder(this, ['renderWordDivs'])
    this.state = {
      wdColor: 'var(--color-green)'
    }
    this.wordStyles = {
      padding: '.125em 1em',
      color: 'var(--color-green)',
      display: 'inline-block',
      fontSize: '3em',
      fontFamily: 'Art-Sans'
    }
  }

  componentDidMount () {
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

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.wdColor !== nextState.wdColor) return true
    else if (this.props.title !== nextProps.title) return true
    else return false
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps !== this.props) {
      console.log(this.props, prevProps)
    }
  }

  renderWordDivs () {
    const outerWidth = this.outer.getBoundingClientRect().width
    const innerWidth = this.word.getBoundingClientRect().width
    const arr = []
    console.log(outerWidth, innerWidth)
    if (innerWidth > 0) {
      const num = Math.ceil(outerWidth / innerWidth)
      console.log(num)
      for (let i = 0; i < num; i++) {
        arr.push(this.props.title)
      }
    }
    return arr.map((wd, i) => {
      return (
        <div key={i} className='word' style={this.wordStyles}>
          <FontWyler phrase={wd} />
          <style jsx>{`
            .word {
              animation: marquee${i + 2} 3s linear infinite;
              color: ${this.state.wdColor};
              animation-delay: ${(i + 1) * 5};
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
