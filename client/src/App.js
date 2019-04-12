import React from 'react';
import { Provider } from 'react-redux';

import storeConfig from './storeConfig';

import Routes from './components/routes';

export default function App() {
  const store = storeConfig();

  return (
    <Provider store={store} data-testid="App">
      <Routes />
    </Provider>
  );
}
