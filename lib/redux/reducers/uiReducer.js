import { SET_VIEW_STATE } from '../actions/types'

const initialState = {
  viewState: 'events'
}

export default function uiReducer (state = initialState, action) {
  const defaultAction = key => {
    const newState = { ...state }
    console.log(action.payload)
    newState[key] = action.payload
    return newState
  }

  switch (action.type) {
    case SET_VIEW_STATE: {
      return defaultAction('viewState')
    }
    default:
      return state
  }
}
