import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Store from './Store'
import App from 'next/app'

import LayoutDesktop from '../../components/core/LayoutDesktop'
import LayoutMobile from '../../components/core/LayoutMobile'

class AppProvider extends Component {
  constructor (props) {
    super(props)
    this.state = { isMobile: false, inited: false }
  }
  componentDidMount () {
    const init = (() => {
      if (typeof window !== 'undefined') {
        if (window.orientation !== undefined || window.innerWidth < 500) {
          this.setState({ isMobile: true })
        }
        this.setState({ inited: true })
        console.log('isOk');
      } else {
        setTimeout(init, 200)
      }
    })()
  }
  render () {
    return (
      <Provider store={Store}>
        <div> { this.state.inited &&
          <div className='wrapper'>
            { this.state.isMobile
              ? <LayoutMobile {...this.props}>{ this.props.children }</LayoutMobile>
              : <LayoutDesktop {...this.props}>{ this.props.children }</LayoutDesktop>
            }
          </div>
        } </div>
      </Provider>
    )
  }
} 

export default AppProvider
