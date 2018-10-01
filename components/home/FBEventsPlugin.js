import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FBEventsPlugin extends Component {
  constructor (props) {
    super(props)
    this.state = { loaded: false }
  }
  componentDidMount () {
    FB.XFBML.parse()
    setTimeout(() => {
      this.setState({ loaded: true })
    }, 1000)
  }
  render () {
    const { ID, width } = this.props
    return (
      <div className='outer-container'>
        <div className='fb-page' data-href={`https://www.facebook.com/${ID}`} 
          data-tabs='events' data-small-header='true' data-adapt-container-width='true'
          data-hide-cover='true' data-show-facepile='false' data-hide-cta='true' />
        <style jsx>{`
          .outer-container {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .fb-page {
            margin: 2em;
            display: ${this.state.loaded ? 'block' : 'none'};
            border: 2px solid var(--color-green);
            box-sizing: border-box;
            width: fit-content;
            min-width: 300px;
          }
        `}</style>
      </div>
    )
  }
}

FBEventsPlugin.propTypes = {
  ID: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
}

export default FBEventsPlugin
