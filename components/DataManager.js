import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkIfMobile, getVPDims, fetchFBdata } from '../lib/redux/actions'
import { binder } from '../lib/_utils'

const DataManager = ComposedComponent => {
  class WrappedComponent extends Component {
    constructor (props) {
      super(props)
    }
    componentDidMount () {}
    render () {
      return (
        <ComposedComponent {...this.props} />
      )
    }
  }
  return WrappedComponent
}

function mapStateToProps (state) {
  return {
    isMobile: state.env.isMobile,
    dims: state.env.dims,
    FBdata: state.data.FBdata
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCheckIfMobile: () => dispatch(checkIfMobile()),
    onGetVPDims: () => dispatch(getVPDims()),
    onFetchFBdata: () => dispatch(fetchFBdata())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataManager)
