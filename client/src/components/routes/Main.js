import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeView from '../view/Home';
import UserView from '../view/User';
import NotFoundView from '../view/NotFound';

export default function MainRoutes() {
  return (
    <Switch data-testid="MainRoutes">
      <Route exact path="/home" component={HomeView} />
      <Route exact path="/:username" component={UserView} />
      <Route component={NotFoundView} />
    </Switch>
  );
}
