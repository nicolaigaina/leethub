import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import NotFound from '../../pages/NotFound';
import Signin from '../../pages/Signin';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/signin">
      <Signin />
    </Route>
    <Route>
      <NotFound />
    </Route>
  </Switch>
);

export default Routes;
