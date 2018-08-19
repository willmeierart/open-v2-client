import {
  FETCH_FB_DATA,
  SET_ALL_MAP_MARKERS
} from '../actions/types'

const initialState = {
  FBdata: null,
  allMapMarkers: []
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
    case SET_ALL_MAP_MARKERS :
      return defaultAction('allMapMarkers')
    default:
      return state
  }
}
