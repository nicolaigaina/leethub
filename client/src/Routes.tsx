import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './containers/Home';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  )
}

export default Routes;
