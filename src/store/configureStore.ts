import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';

const configureStore = () => {
  const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
  return store;
};

export default configureStore;
