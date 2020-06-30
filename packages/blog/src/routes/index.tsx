import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/signin">
      <Signin />
    </Route>
    <Route exact path="/signup">
      <Signup />
    </Route>
    <Route>
      <NotFound />
    </Route>
  </Switch>
);

export default Routes;
