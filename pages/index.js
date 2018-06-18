import React, { Component } from 'react'
import Head from '../components/Head'
import Home from '../components/home'

export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      introSeen: false
    }
  }
  render () {
    return (
      <div>
        <Head title='Home' />
        <section>
          <Home />
        </section>
      </div>
    )
  }
}
