import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';

const storeConfig = preloadedState => {
  const middlewareEnhancer = applyMiddleware(thunkMiddleware);

  let composedEnhancers;

  process.env.NODE_ENV === 'development'
    ? (composedEnhancers = composeWithDevTools(middlewareEnhancer))
    : (composedEnhancers = compose(middlewareEnhancer));

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
};

export default storeConfig;
