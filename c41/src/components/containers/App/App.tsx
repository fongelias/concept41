import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LandingPage } from 'components/containers/LandingPage/LandingPage';

import './App.css';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/*" component={LandingPage}/>
      </Switch>
    </Router>
  );
}
