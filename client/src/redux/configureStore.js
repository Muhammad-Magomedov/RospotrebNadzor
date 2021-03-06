import { createLogger } from 'redux-logger';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import companyReducer from './features/company';
import recordReducer from './features/record';
import statusReducer from './features/status';
import thunk from 'redux-thunk';
import imageReducer from './features/images';

const logger = createLogger({
  diff: true,
  collapsed: true
})

export const store = createStore(
  combineReducers({
    company: companyReducer,
    record: recordReducer,
    status: statusReducer,
    //image: imageReducer
  }),
  applyMiddleware(thunk, logger)
)