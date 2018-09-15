import PropTypes from 'prop-types'

const CheckBox = ({ isChecked, toggleCheck }) => {
  return (
    <div onClick={toggleCheck} className='outer-container'>
      <div className='inner-container'>
        {isChecked &&
          <svg></svg>
        }
      </div>
      <style jsx>{`
        .outer-container {
          position: relative;
          width: 10px;
          height: 10px;
          background-color: lightgrey;
        }
        .inner-container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

CheckBox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  toggleCheck: PropTypes.func.isRequired
}

export default CheckBox
