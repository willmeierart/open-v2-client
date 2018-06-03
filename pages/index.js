// import { graphql, compose } from 'react-apollo'
// import Loader from 'react-loaders'
// import withData from '../lib/withData'
// import { allFadeColors, allPaintings } from '../lib/queries'
// import { formatColors } from '../lib/_utils'
import React, { Component } from 'react'
import AppProvider from '../lib/redux/AppProvider'
import Head from '../components/Head'
import Home from '../components/home'
// import fetch from 'isomorphic-fetch'

// include boilerplate for global loader dependent on graphql req's:
export default class HomePage extends Component {
  // static async getInitialProps () {
    // const API_URL = ''
    // const res = await fetch(API_URL)
    // const json = await res.json()
    // const { thing } = json
    // return thing
  // }
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <Head title='Home' />
        <Home />
        <section>
          <h1>COMING SOON</h1>
          {/* )} */}
        </section>
        <style jsx>{`
          section {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 100vh;
            font-size: 10em;
            text-align: center;
          }
            {/* .loader-wrapper {
              width:100%; height:100%;
              display: flex; justify-content: center; align-items:center;
            } */}
        `}</style>
      </div>
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
