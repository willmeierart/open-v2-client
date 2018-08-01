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
    const { Component } = this.props
    return <Container>
      <AppProvider {...this.props}>
        <Component {...this.props} />
      </AppProvider>
      <style jsx global>{`
        html {
          --color-lightblue: #eae6ff;
          --color-blue: #5a76e4;
          --color-green: #008f7e;
          --color-yellow: #ddff00;
          --color-orange: #ff6f33;
        }
        body {
          font-family: 'Campaign';
          margin: 0;
          width: 100vw;
          box-sizing: border-box;
        }
        .ev-font {
          font-family: 'Art-Sans';
        }
        *::-webkit-scrollbar {
          display: none;
        }
        * {
          -ms-overflow-style: none;
        }
        a {
          text-decoration: none;
          color: inherit;
          font: inherit;
          font-size: inherit;
        }
        li {
          list-style: none;
        }
      `}</style>
    </Container>
  }
}

// example of GraphQL with multiple queries composed:
// export default withData(
//   compose(
//     graphql(allThings1, { name: 'allThings1' }),
//     graphql(allThings2, { name: 'allThings2' })
//   )(HomePage)
// )
