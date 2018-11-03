// literally HTML head - all SEO stuff, etc.
import Head from 'next/head'

const initialProps = {
	title: 'Agency Zero',
	initialScale: '1.0'
}

const CustomHead = (props = initialProps) => {
	const { title, initialScale } = props
	return (
		<Head>
			<title key='title'>{title}</title>
			<meta key='charset' charSet='utf-8' />
			<meta
				key='viewport'
				name='viewport'
				content={`initial-scale=${initialScale || initialProps.initialScale}, width=device-width, shrink-to-fit=no`}
			/>
			<meta key='meta-title' name='title' content='Agency Zero' />
			<link rel='shortcut icon' href='/static/favicon.ico' />
			<script defer src='https://use.fontawesome.com/releases/v5.0.6/js/all.js' />
			{/* <script async src='https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X' /> */}
			<link rel='stylesheet' href='https://use.typekit.net/weo5ngi.css' />
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
		</Head>
	)
}

export default CustomHead
