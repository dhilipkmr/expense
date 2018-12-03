import {createStore, applyMiddleware} from 'redux';
import Reducers from './Reducers';
import thunk from 'thunk';

const initialStoreContent = {
  hasLoggedIn: false,
  expenseData: [],
  config: {}
}

const store = createStore(Reducers, initialStoreContent, applyMiddleware(thunk));
