import React from 'react'
import App, { Container } from 'next/app'
import AppProvider from '../lib/redux/AppProvider'
// import { binder } from '../lib/_utils'

export default class MyApp extends App {
  // constructor (props) {
  //   super(props)

  // }
  // // handleScroll () {

  // // }
  // componentDidMount () {

  // }
  render () {
    console.log(this.props)
    const { Component } = this.props
    return (
      <Container>
        <AppProvider {...this.props}>
          <Component {...this.props} />
        </AppProvider>
        <style jsx global>{`
          html {
            --color-lightblue: #EAE6FF;
            --color-blue: #5A76E4;
            --color-green: #008F7E;
            --color-yellow: #DDFF00;
            --color-orange: #FF6F33;
          }
          body {
            font-family: 'Campaign';
            margin: 0;
            overflow: hidden;
          }
        `}</style>
      </Container>
    )
  }
}


// example of GraphQL with multiple queries composed:
// export default withData(
//   compose(
//     graphql(allThings1, { name: 'allThings1' }),
//     graphql(allThings2, { name: 'allThings2' })
//   )(HomePage)
// )
