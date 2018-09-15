import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import MarqueeHeader from './MarqueeHeader'
import DaLogo from '../assets/DA_LOGO'

class TitleBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      logoHovered: false
    }
    this.handleLogoHover = this.handleLogoHover.bind(this)
  }
  handleLogoHover (bool) {
    if (bool !== this.state.logoHovered) {
      this.setState({ logoHovered: bool })
    }
  }

  render () {
    const { isHovered, title, handleClick } = this.props
    return (
      <div className='header-outer'>
        <div className='header-inner'>
          { isHovered
            ? <div className='menu-bar'>
              <div className='logo-wrapper' onMouseOver={() => { this.handleLogoHover(true) }} onMouseLeave={() => { this.handleLogoHover(false) }} >
                <Link href='/'><a>
                  <DaLogo color={this.state.logoHovered ? '#008f7e' : '#EAE6FF'} />
                </a></Link>
              </div>
              <div className='links-wrapper'>
                {/* <div onClick={() => { handleClick('events') }} className='events-link link'>events</div> */}
                <div onClick={() => { handleClick('galleries') }} className='galleries-link link'>galleries</div>
                <div className='links-link link'><Link href='/links'><a>links</a></Link></div>
              </div>
            </div>
            : <MarqueeHeader title={title} />
          }
        </div>
        <style jsx>{`
          .header-outer {
            width: 100vw;
            height: 100px;
            background-color: black;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 20;
          }
          .menu-bar {
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: row;
            font-family: 'Art-Sans';
            width: 100vw;
          }
          .logo-wrapper {
            padding: 2em;
            margin-top: -.25em;
          }
          .links-wrapper {
            display: flex;
          }
          .link {
            color: var(--color-lightblue);
            padding-right: 1.5em;
            font-size: 2.5em;
            cursor: pointer;
          }
          .link:last-of-type {
            padding-right: 1em;
          }
          .events-link:hover {
            color: var(--color-green);
          }
          .galleries-link:hover {
            color: var(--color-blue);
          }
          .links-link:hover {
            color: var(--color-orange);
          }
          a {
            color: inherit;
            text-decoration: none;
          }
          a:hover, .link:hover {
            text-transform: uppercase;
          }
        `}</style>
      </div>
    )
  }
}

export default TitleBar
