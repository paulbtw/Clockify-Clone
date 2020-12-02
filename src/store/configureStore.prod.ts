import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';

const configureStore = () => {
	const store = createStore(reducers, {}, applyMiddleware(thunkMiddleware));
	return store;
};

export default configureStore;
