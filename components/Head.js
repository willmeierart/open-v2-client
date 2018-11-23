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
			<meta key='meta-title' name='title' content='Denver&#39;s Art' />
			<meta property='og:title' content='Denver&#39;s Art' />
			<meta property='og:url' content='https://denvers.art/' />
			<link rel='shortcut icon' href='/static/favicon.ico' />
			{/* <script async src='https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X' /> */}
			<link rel='stylesheet' href='https://use.typekit.net/weo5ngi.css' />
			<meta name='apple-mobile-web-app-capable' content='yes' />
		</Head>
	)
}

export default CustomHead
