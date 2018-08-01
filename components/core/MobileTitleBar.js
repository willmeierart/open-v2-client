import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import DaLogo from '../assets/DA_LOGO'
import MobileMenu from './MobileMenu'
import MobileNavIcon from './MobileNavIcon'

class MobileTitleBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }
  render () {
    const { menuOpen } = this.state
    return (
      <div className='header-outer'>
        <div className='header-inner'>
          <div className='menu-bar'>
            <div className='logo-wrapper'>
              <Link href='/'><a>
                <DaLogo color='#EAE6FF' />
              </a></Link>
            </div>
            <div className='nav-icon-wrapper'>
              <MobileNavIcon />
            </div>
            { menuOpen &&
              <div className='menu-wrapper'>
                <MobileMenu />
              </div>
            }
          </div>
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
          a {
            color: inherit;
            text-decoration: none;
          }
        `}</style>
      </div>
    )
  }
}

export default MobileTitleBar
