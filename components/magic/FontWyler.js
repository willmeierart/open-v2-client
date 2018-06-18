import PropTypes from 'prop-types'
import randomBoolean from 'random-boolean'

const FontWyler = ({ phrase }) => {
  console.log('fw')
  const splitta = phrase.split('').map((l, i) => {
    // const random = (() => Math.random() * 4 < 2 || i === 0)()
    return <span key={i} style={{ textTransform: randomBoolean() ? 'uppercase' : 'none' }}>{ l }</span>
  })
  return <div className='phrase-wrapper'>{ splitta }</div>
}

FontWyler.propTypes = {
  phrase: PropTypes.string.isRequired
}

export default FontWyler
