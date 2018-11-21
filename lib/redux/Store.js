import { compose, createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import logger from 'redux-logger'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { SET_ALL_MAP_MARKERS, SET_ACTIVE_MARKER, FETCH_FB_DATA, CHECK_IF_MOBILE } from './actions/types'

// import {} from './actions/types'

// const logger = createLogger({
// 	predicate: (getState, action) => {
// 		return (
// 			// action.type !== SET_ACTIVE_MARKER &&
// 			// action.type !== SET_ALL_MAP_MARKERS &&
// 			// action.type !== FETCH_FB_DATA && action.type !== CHECK_IF_MOBILE
// 		)
// 	}
// })

const middlewares = [ thunk, promise ]

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger)
}

const reduxDevTools =
	typeof window !== 'undefined'
		? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		: function (a) {
				return a
			}

const Store = compose(applyMiddleware(...middlewares))(createStore)(reducers, reduxDevTools)

export default Store
