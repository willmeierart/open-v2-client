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
