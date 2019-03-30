import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';

import Landing from './components/container/Landing';
import Page from './routes/Page';

import storeConfig from './storeConfig';

const store = storeConfig();

const App = () => (
	<Provider store={store}>
		<Router>
			<Switch>
				<Route path='/' exact component={Landing} />
				<Route component={Page} />
			</Switch>
		</Router>
	</Provider>
);

export default App;
