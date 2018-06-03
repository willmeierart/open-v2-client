import PropTypes from 'prop-types'

const ListModule = ({ data }) => {
  return (
    <div className='outer-container'>
      <div className='inner-container'></div>
      <style jsx>{`
        .outer-container {}
        .inner-container {}
      `}</style>
    </div>
  )
}

ListModule.propTypes = {}

export default ListModule
