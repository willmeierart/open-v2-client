import PropTypes from 'prop-types'
import Hamburger from '../assets/Hamburger'
import LeftArrow from '../assets/LeftArrow'

const MobileNavIcon = ({ menuIsOpen, handleClick }) => {
  return (
    <div className='outer-container'>
      <div onClick={handleClick} className='inner-container'>
        { menuIsOpen ? <LeftArrow /> : <Hamburger /> }
      </div>
      <style jsx>{`
        .outer-container {
          margin-right: 1em;
        }
        .inner-container {
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

MobileNavIcon.propTypes = {}

export default MobileNavIcon
