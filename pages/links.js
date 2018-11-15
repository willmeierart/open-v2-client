import Head from '../components/Head'
import Links from '../components/links'
import { links as Ls } from '../lib/data'

const ev = [ [ ...Ls ][0], [ ...Ls ][1] ]

export default function LinksPage () {
	const shuffledArr = (() => {
		let links = Ls.slice(2)
		let LINKS = [ ...links ]
		let currentIndex = links.length
		let temporaryValue
		let randomIndex
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex -= 1
			temporaryValue = links[currentIndex]
			links[currentIndex] = links[randomIndex]
			links[randomIndex] = temporaryValue
		}
		return ev.concat(links)
	})()
	return (
		<div>
			<Head title='Links' />
			<section>
				<Links links={shuffledArr} />
			</section>
		</div>
	)
}
