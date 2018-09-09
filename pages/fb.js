// import { allFadeColors, allPaintings } from '../lib/queries'
// import { formatColors } from '../lib/_utils'
import React, { Component } from 'react'
import AppProvider from '../lib/redux/AppProvider'
import Head from '../components/Head'
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
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div>
        <Head title='Home' />
        <section>
          {/* {allThings1.loading || allThings2.loading ? (
            <div className='loader-wrapper'>
              <Loader type='line-spin-fade-loader' active />
            </div>
          ) : ( */}
          <h2> dear FB privacy policy auditors:</h2>
          <div> in lieu of having a working API key, I can offer this to show how the app will work:</div>
          <div>
            <a href='https://github.com/willmeierart/OPEN-v2-proxy'>github link for the proxy server which will use the app token</a>
            <span>(it worked before all this privacy reform happened)</span>
          </div>
          <div>
            <a href='http://openartscenedenver.online'>link to the original clientside version of the idea</a>
            <span>(which required oauth, this version will use the proxy server and circumvent any login or user data collection)</span>
            <a href='https://github.com/willmeierart/OPEN-ArtScene'> and a link to the github for the old iteration</a>
          </div>
          <div>
            <a href='/privacy'>see the privacy policy</a>
          </div>
          {/* )} */}
        </section>
        <style jsx>{`
            {/* .loader-wrapper {
              width:100%; height:100%;
              display: flex; justify-content: center; align-items:center;
            } */}
            section {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              text-align: center;
              height: 100vh;
            }
        `}</style>
      </div>
    )
  }
}
