import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeView from '../../components/view/Home';
import UserView from '../../components/view/User';
import NotFound from '../../components/view/NotFound';

const Main = () => (
	<main id="main" role="main">
		<Switch>
			<Route exact path="/home" component={HomeView} />
			<Route exact path="/:username" component={UserView} />
			<Route component={NotFound} />
		</Switch>
	</main>
);

export default Main;
