import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Store from './Store'
import Layout from '../../components/core/Layout'

class AppProvider extends Component {
  constructor (props) {
    super(props)
    this.state = { inited: false }
  }
  componentDidMount () {
    const init = (() => {
      if (typeof window !== 'undefined') {
        // if (window.orientation !== undefined || window.innerWidth < 900) {
        //   this.setState({ isMobile: true })
        // }
        // this.setState({ inited: true })
        // window.addEventListener('resize', () => {
        //   if (!this.state.isMobile && window.innerWidth < 900) {
        //     this.setState({ isMobile: true })
        //     console.log('is mobile')
        //   } else if (this.state.isMobile && window.innerWidth >= 900) {
        //     this.setState({ isMobile: false })
        //     console.log('is not mobile')
        //   }
        // })
        this.setState({ inited: true })
      } else {
        setTimeout(init, 100)
      }
    })()
  }
  render () {
    return (
      <Provider store={Store}>
        <div className='wrapper'>
          { this.state.inited && <Layout {...this.props}>{ this.props.children }</Layout> }
        </div>
      </Provider>
    )
  }
} 

export default AppProvider
