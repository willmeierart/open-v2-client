import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FBEventsPlugin extends Component {
  constructor (props) {
    super(props)
    this.state = { loaded: false }
  }
  async componentDidMount () {
    await FB.XFBML.parse()
    setTimeout(() => {
      this.setState({ loaded: true }, () => {
        // setTimeout(() => {
        //   // console.log(document.querySelector('._1drp._5lv6'))
        //   document.querySelector('._1drp._5lv6').style.display = 'none'
        // }, 1000)
      })

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
            margin-top: 2em;
          }
          .fb-page {
            display: ${this.state.loaded ? 'block' : 'none'};
            box-sizing: border-box;
            width: fit-content;
            min-width: 340px;
          }
          @media screen and (max-width: 450px) {
            .fb-page {
              min-width: 200px;
            }
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
