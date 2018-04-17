import { combineReducers } from 'redux'
import dataReducer from './dataReducer'
import envReducer from './envReducer'

const rootReducer = combineReducers({
  env: envReducer,
  data: dataReducer
})

export default rootReducer
