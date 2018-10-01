import PropTypes from 'prop-types'
import randomBoolean from 'random-boolean'

const FontWyler = ({ phrase }) => {
  const splitta = phrase.split('').map((l, i) => {
    return <span key={i} style={{ textTransform: randomBoolean() ? 'uppercase' : 'none', color: 'inherit', fontSize: 'inherit' }}>{ l }</span>
  })
  return <div className='phrase-wrapper' style={{ color: 'inherit', fontSize: 'inherit' }}>{ splitta }</div>
}

FontWyler.propTypes = {
  phrase: PropTypes.string.isRequired
}

export default FontWyler
