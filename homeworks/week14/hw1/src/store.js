import { createStore, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'

import reducers from './reducer'

const store = createStore(reducers, applyMiddleware(
  promiseMiddleware(),
  logger
))

export default store