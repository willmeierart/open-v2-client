import PropTypes from 'prop-types'

const EventsToggle = ({ toggleEventState, eventState }) => {
  const states = ['today', 'upcoming']
  return (
    <div className='outer-container'>
      <div className='inner-container'>
        <div onClick={toggleEventState} className={`today item ${!eventState && 'active'}`}>{ states[0] }</div>
        <div onClick={toggleEventState} className={`upcoming item ${eventState && 'active'}`}>{ states[1] }</div>
      </div>
      <style jsx>{`
        .outer-container {
          font-size: 2em;
          width: 100%;
          height: 1.5em;
          position: relative;
          display: flex;
          justify-content: center;
        }
        .inner-container {
          width: 80%;
          display: flex;
          justify-content: center;
          position: relative;
        }
        .item {
          text-transform: uppercase;
          width: 48%;
          margin: 1%;
        }
      `}</style>
    </div>
  )
}

EventsToggle.propTypes = {
  toggleEventState: PropTypes.func.isRequired,
  eventState: PropTypes.number.isRequired
}

export default EventsToggle
