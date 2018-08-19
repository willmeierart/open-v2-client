import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import { binder } from '../lib/_utils'

export default class CustomDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }
  render () {
    return (
      <html lang='en-US'>
        <Head />
        <body>
          <div className='scroll-wrapper'>
            <Main />
            <NextScript />
          </div>
          <style jsx>{`
            .scroll-wrapper {
              width: 100%;
              padding-right: 50px;
              margin-right: -50px;
              box-sizing: content-box;
              position: relative;
            }
          `}</style>
        </body>
      </html>
    )
  }
}
