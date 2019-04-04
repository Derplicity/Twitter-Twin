import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DefaultAsideView from '../view/DefaultAside';

export default function AsideRoutes() {
	return (
		<Switch data-testid="AsideRoutes">
			<Route component={DefaultAsideView} />
		</Switch>
	);
}
