import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import Reducers from './Reducers';

const initialStoreContent = {
  hasLoggedIn: false,
  expenseData: [],
  config: {}
}

const loggerMiddleware = createLogger();
const store = createStore(Reducers, initialStoreContent, applyMiddleware(
  thunk
));
export default store;
