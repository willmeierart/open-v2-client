import {
  FETCH_FB_DATA,
  SET_ALL_MAP_MARKERS,
  SET_ACTIVE_MARKER,
  SET_ACTUAL_MAP_MARKERS
} from '../actions/types'

const initialState = {
  FBdata: null,
  allMapMarkers: [],
  actualMapMarkers: [],
  activeMarker: ''
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
      const newMapMarkers = state.allMapMarkers.map(m => ({ ...m }))
      const newState = { ...state, allMapMarkers: newMapMarkers }
      // const newMapMarkers = newState.allMapMarkers.slice()
      newState.allMapMarkers = action.payload
      return newState
      // return defaultAction('allMapMarkers')
    case SET_ACTUAL_MAP_MARKERS :
      return defaultAction('actualMapMarkers')
    case SET_ACTIVE_MARKER :
      return defaultAction('activeMarker')
    default:
      return state
  }
}
