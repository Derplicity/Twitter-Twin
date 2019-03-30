import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';

const storeConfig = preloadedState => {
	const middlewareEnhancer = applyMiddleware(thunkMiddleware);

	const composedEnhancers = compose(
		middlewareEnhancer,
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__(),
	);

	const store = createStore(rootReducer, preloadedState, composedEnhancers);

	return store;
};

export default storeConfig;
