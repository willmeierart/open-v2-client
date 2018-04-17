import {
  FETCH_FB_DATA
} from '../actions/types'

const initialState = {
  FBdata: null
}

export default function dataReducer (state = initialState, action) {
  const defaultAction = key => {
    const newState = { ...state }
    newState[key] = action.payload
    return newState
  }

  switch (action.type) {
    case FETCH_FB_DATA :
      return defaultAction('FBdata')
    default:
      return state
  }
}
