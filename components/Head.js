// literally HTML head - all SEO stuff, etc.
import Head from 'next/head'

const initialProps = {
	title: "Denver's Art",
	initialScale: '1.0'
}

const CustomHead = (props = initialProps) => {
	const { title, initialScale } = props
	return (
		<Head>
			<script async src='https://www.googletagmanager.com/gtag/js?id=UA-129744723-1' />
			<title key='title'>Denver's Art</title>
			<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
			<meta name='apple-mobile-web-app-capable' content='yes' />
			<meta key='charset' charSet='utf-8' />
			<meta
				key='viewport'
				name='viewport'
				content={`initial-scale=${initialScale || initialProps.initialScale}, width=device-width, shrink-to-fit=no`}
			/>
			<meta
				name='description'
				content='The front page of Denvers Art Scene - denvers.art is a comprehensive list of the best art galleries and art events the city has to offer.'
			/>
		</Head>
	)
}

export default CustomHead
