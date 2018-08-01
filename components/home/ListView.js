import PropTypes from 'prop-types'
import ListModule from './ListModule'

const ListView = ({ list }) => {
  // console.log(list)
  const renderList = () => list.map((li, i) => (
    <li key={li.id + i}>
      { i }
      <ListModule data={li} />
    </li>
  ))
  return (
    <div className='outer-container'>
      <div className='inner-container'></div>
      <ul>{ renderList() }</ul>
      <style jsx>{`
        .outer-container {}
        .inner-container {}
        ul {
          padding: 0;
        }
      `}</style>
    </div>
  )
}

ListView.propTypes = {}

export default ListView
