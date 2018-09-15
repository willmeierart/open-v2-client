import { combineReducers } from 'redux'
import dataReducer from './dataReducer'
import envReducer from './envReducer'
import uiReducer from './uiReducer'

const rootReducer = combineReducers({
  env: envReducer,
  data: dataReducer,
  ui: uiReducer
})

export default rootReducer
