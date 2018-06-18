import Router from 'next/router'
import MarqueeHeader from './MarqueeHeader'

const Menu = ({ toggleMenu, setViewState }) => {
  // const renderList = (set, element) => {
  //   return set.map((each, i) => (<element key={i}>{ each }</element>))
  // }
  const items = ['EVENTS', 'GALLERIES', 'LINKS', 'INFO']

  const handleClick = item => {
    let route = '/index'
    switch (item) {
      case 'LINKS':
        route = '/links'
        break
      case 'INFO':
        route = '/info'
        break
      default:
        route = '/index'
    }
    if (item === 'EVENTS' || item === 'GALLERIES') {
      setViewState(item)
    }
    toggleMenu()
    Router.push(route)
  }

  const renderMenu = () => (
    items.map(item => {
      <div onClick={handleClick}>
        <MarqueeHeader isDropdown item={''} />
      </div>
    })
  )
  return (
    <div className='menu-outer'>
      <div className='menu-inner'>
        {/* { renderList() } */}
      </div>
      <style jsx>{``}</style>
    </div>
  )
}

export default Menu
