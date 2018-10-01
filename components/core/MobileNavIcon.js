import PropTypes from 'prop-types'
import { MorphReplace } from 'react-svg-morph'
import Hamburger from '../assets/Hamburger'
import LeftArrow from '../assets/LeftArrow'

const MobileNavIcon = ({ menuIsOpen, handleClick }) => {
  return (
    <div className='outer-container'>
      <div onClick={handleClick} className='inner-container'>
        <MorphReplace width={menuIsOpen ? 75 : 31} height={menuIsOpen ? 30 : 23} style={{ fill: 'DDFF00', overflow: 'visible' }}
          viewBox='0 0 98 38'
          preserveAspectRatio='xMinYMid meet' rotation={menuIsOpen ? 'counterclock' : 'clockwise'}>
          { menuIsOpen ? <LeftArrow key='arrow' /> : <Hamburger key='burger' /> }
        </MorphReplace>
      </div>
      <style jsx>{`
        .outer-container {
          margin-right: ${menuIsOpen ? '2em' : '1em'};
        }
        .inner-container {
          cursor: pointer;
          overflow: visible;
        }
      `}</style>
    </div>
  )
}

MobileNavIcon.propTypes = {
  menuIsOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default MobileNavIcon
