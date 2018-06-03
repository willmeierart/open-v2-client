import PropTypes from 'prop-types'
import ListModule from './ListModule'

const ListView = ({ list }) => {
  const renderList = () => list.map(li => (
    <li key={li.id}>
      <ListModule data={li.data} />
    </li>
  ))
  return (
    <div className='outer-container'>
      <div className='inner-container'></div>
      <ul>{ renderList() }</ul>
      <style jsx>{`
        .outer-container {}
        .inner-container {}
      `}</style>
    </div>
  )
}

ListView.propTypes = {}

export default ListView
