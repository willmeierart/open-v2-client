import Head from '../components/Head'
import Links from '../components/links'
import { links } from '../lib/data'

export default function LinksPage () {
  const shuffledArr = (() => {
    let LINKS = [...links]
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
    return LINKS
  })()
  return (
    <div>
      <Head title='Home' />
      <section>
        <Links links={shuffledArr} />
      </section>
    </div>
  )
}
