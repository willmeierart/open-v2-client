import { SET_VIEW_STATE } from '../actions/types'

const initialState = {
  viewState: 'events'
}

export default function uiReducer (state = initialState, action) {
  const defaultAction = key => {
    const newState = { ...state }
    newState[key] = action.payload
    return newState
  }

  switch (action.type) {
    case SET_VIEW_STATE: {
      defaultAction('viewState')
      break
    }
    default:
      return state
  }
}
