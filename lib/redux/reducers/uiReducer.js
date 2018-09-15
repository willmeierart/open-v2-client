import { SET_VIEW_STATE, SET_EVENTS_STATE } from '../actions/types'

const initialState = {
  viewState: 'galleries',
  eventsState: 'today'
}

export default function uiReducer (state = initialState, action) {
  const defaultAction = key => {
    const newState = { ...state }
    newState[key] = action.payload
    return newState
  }
  switch (action.type) {
    case SET_VIEW_STATE: {
      return defaultAction('viewState')
    }
    case SET_EVENTS_STATE: {
      return defaultAction('eventsState')
    }
    default:
      return state
  }
}
