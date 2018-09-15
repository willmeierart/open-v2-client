import PropTypes from 'prop-types'
import Scribble from '../assets/Scribble'

const EventsToggle = ({ toggleEventState, eventState }) => {
  const states = ['today', 'upcoming']
  return (
    <div className='outer-container'>
      <div className='view'>view: </div>
      <div className='inner-container'>
        <div onClick={() => { toggleEventState(states[0]) }} className={`today item ${!eventState && 'active'}`}>
          <span className='checkbox'>
            { eventState === states[0] && <div className='scribble'><Scribble /></div> }
          </span>
          <span>{ states[0] }</span>
        </div>
        <div onClick={() => { toggleEventState(states[1]) }} className={`upcoming item ${eventState && 'active'}`}>
          <span className='checkbox'>
            { eventState === states[1] && <div className='scribble'><Scribble /></div> }
          </span>
          <span>{ states[1] }</span>
        </div>
      </div>
      <style jsx>{`
        .outer-container {
          font-size: 1.5em;
          width: 100%;
          height: 1.5em;
          position: relative;
          display: flex;
          justify-content: space-between;
          color: var(--color-lightblue);
          margin: 2.25em;
          width: calc(100% - 4.5em);
          align-items: center;
          margin-bottom: .5em;
        }
        .inner-container {
          width: 80%;
          display: flex;
          justify-content: center;
          justify-content: flex-end;
          position: relative;
          align-items: center;
        }
        .item {
          text-transform: uppercase;
          width: 48%;
          margin: 1%;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .view {
          font: Campaign normal sans-serif;
        }
        .checkbox {
          background-color: var(--color-lightblue);
          width: 1em;
          height: 1em;
          min-width: 1em;
          min-height: 1em;
          display: inline-block;
          margin-right: .25em;
        }
      `}</style>
    </div>
  )
}

EventsToggle.propTypes = {
  toggleEventState: PropTypes.func.isRequired,
  eventState: PropTypes.string.isRequired
}

export default EventsToggle
