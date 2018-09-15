import PropTypes from 'prop-types'

const FBEventsPlugin = ({ ID, width }) => {
  return (
    <div className='outer-container'>
      <div className='fb-page' data-href={`https://www.facebook.com/${ID}`} data-tabs='events' data-small-header='true' data-adapt-container-width='true' data-hide-cover='true' data-show-facepile='false' data-hide-cta='true'/>
      <style jsx>{`
        .fb-page {
          width: ${width}px;
          min-height: ${width}px;
        }
        .outer-container {
          width: ${width}px;
          height: ${width}px;
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

FBEventsPlugin.propTypes = {
  id: PropTypes.string.isRequired
}

export default FBEventsPlugin
