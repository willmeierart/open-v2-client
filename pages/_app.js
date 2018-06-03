import React from 'react'
import App, { Container } from 'next/app'
import AppProvider from '../lib/redux/AppProvider'

export default class MyApp extends App {
  render () {
    const { Component } = this.props
    return (
      <Container>
        <AppProvider>
          <Component {...this.props} />
        </AppProvider>
        <style jsx global>{`
          body {
            font-family: 'Art-Sans';
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
