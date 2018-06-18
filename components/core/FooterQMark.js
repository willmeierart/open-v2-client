import PropTypes from 'prop-types'
import Link from 'next/link'

const FooterQMark = props => {
  return (
    <div className='outer-container'>
      <Link href='info'>
        <div className='inner-container'>
          <div className='q-mark'>
            <svg></svg>
          </div>
        </div>
      </Link>
      <style jsx>{`
        .outer-container {
          position: absolute;
          width: 5vw;
          height: 5vw;
        }
        .inner-container {
          position: relative;
          width: 5vw;
          height: 5vw;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

FooterQMark.propTypes = {}

export default FooterQMark
