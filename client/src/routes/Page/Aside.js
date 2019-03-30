import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DefaultAsideView from '../../components/view/DefaultAside';

const Aside = () => (
	<Switch>
		<Route component={DefaultAsideView} />
	</Switch>
);

export default Aside;
