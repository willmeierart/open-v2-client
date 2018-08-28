import PropTypes from 'prop-types'

const FauxWyler = ({ phrase }) => {
  const splitta = phrase.split('').map((l, i) => {
    return <span key={i} style={{ textTransform: i % 2 === 0 ? 'uppercase' : 'none', color: 'inherit', fontSize: 'inherit' }}>{ l }</span>
  })
  return <div className='phrase-wrapper' style={{ color: 'inherit', fontSize: 'inherit' }}>{ splitta }</div>
}

FauxWyler.propTypes = {
  phrase: PropTypes.string.isRequired,
  isMobileMenu: PropTypes.bool
}

export default FauxWyler
