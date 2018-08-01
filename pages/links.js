import Head from '../components/Head'
import Links from '../components/links'
import { link } from '../lib/mockData'

export default function LinksPage () {
  const links = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ].map(l => link)
  return (
    <div>
      <Head title='Home' />
      <section>
        <Links links={links} />
      </section>
    </div>
  )
}
