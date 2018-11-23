import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class CustomDocument extends Document {
	static getInitialProps ({ renderPage }) {
		const { html, head, errorHtml, chunks } = renderPage()
		const styles = flush()
		return { html, head, errorHtml, chunks, styles }
	}

	render () {
		return (
			<html lang='en-US'>
				<Head>
					<style
						dangerouslySetInnerHTML={{
							__html: `
								@font-face {
									font-family: 'Art-Sans';
									src: url('/static/fonts/ArtSans.eot');
									src: url('/static/fonts/ArtSans.eot?#iefix') format('embedded-opentype'),
										url('/static/fonts/ArtSans.woff2') format('woff2'),
										url('/static/fonts/ArtSans.woff') format('woff'),
										url('/static/fonts/ArtSans.ttf') format('truetype');
									font-weight: normal;
									font-style: normal;
								}
							`
						}}
					/>
					<script
						key='google-map'
						type='text/javascript'
						src={`https://maps.googleapis.com/maps/api/js?key=${process.env.MAPS_API_KEY}`}
						async
						defer
					/>
					<meta key='meta-title' name='title' content='Denvers Art' />
					<meta key='og:title' property='og:title' content='Denvers Art' />
					<meta key='og:url' property='og:url' content='https://denvers.art/' />
					<meta key='og:image' property='og:image' content='/static/assets/logo.jpg' />
					<meta key='og:description' property='og:description' content='The front page of Denvers Art scene' />
					<link key='icon' rel='shortcut icon' href='/static/favicon.ico' />
					<link key='typekit' rel='stylesheet' href='https://use.typekit.net/weo5ngi.css' />
					<script
						dangerouslySetInnerHTML={{
							__html: `
						window.dataLayer = window.dataLayer || []
						function gtag () {
							window.dataLayer.push(arguments)
						}
						gtag('js', new Date())
						gtag('config', 'UA-129744723-1')
				`
						}}
					/>
				</Head>
				<body>
					<div
						dangerouslySetInnerHTML={{
							__html: `
								<div id="fb-root"></div>
								<script>(function(d, s, id) {
									var js, fjs = d.getElementsByTagName(s)[0];
									if (d.getElementById(id)) return;
									js = d.createElement(s); js.id = id;
									js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.1&appId=263586687740526&autoLogAppEvents=1';
									fjs.parentNode.insertBefore(js, fjs);
								}(document, 'script', 'facebook-jssdk'));</script>
							`
						}}
					/>
					<div className='main-sec'>
						<Main />
						<NextScript />
					</div>
					<style jsx>{`
						.main-sec {
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
