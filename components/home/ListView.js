import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Element, scroller } from 'react-scroll'
import ListModule from './ListModule'

class ListView extends Component {
  componentDidUpdate (prevProps) {
    if (this.props.activeID !== prevProps.activeID) {
      if (this.props.openList) this.props.openList()
      setTimeout(this.scrollToEl, this.props.openList ? 490 : 100)
    }
  }
  scrollToEl = () => {
    const { activeID } = this.props
    const el = ReactDOM.findDOMNode(this[activeID])
    console.log(el, el.offsetTop)
    scroller.scrollTo(activeID, {
      duration: 1000,
      // delay: 600,
      smooth: true,
      containerId: 'list-view',
      offset: this.props.openList ? -230 : -130
    })
  }
  renderList = () => {
    const { list, setActiveMarker, activeID } = this.props
    return list.map((li, i) => (
      <li ref={r => { this[li.id] = r }} key={li.id + i}>
        <Element name={li.id}>
          <ListModule data={li} setActiveMarker={setActiveMarker} activeID={activeID} shouldOpen={activeID === li.id} />
        </Element>
      </li>
    ))
  }
  render () {
    return (
      <div className='outer-container'>
        <ul>{ this.renderList() }</ul>
        <style jsx>{`
          ul {
            margin-top: 2em;
            padding: 0;
          }
        `}</style>
      </div>
    )
  }
}

ListView.propTypes = {}

export default ListView
