import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LandingPage, LandingPagePath } from 'components/containers/LandingPage/LandingPage';
import { DocsPage, DocsPagePath } from 'components/containers/DocsPage/DocsPage';
import { ErrorPage, ErrorPagePath } from 'components/containers/ErrorPage/ErrorPage';
import { ConceptsPage, ConceptsPagePath } from 'components/containers/ConceptsPage/ConceptsPage';

import './App.css';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={DocsPagePath} component={DocsPage}/>
        <Route exact path={LandingPagePath} component={LandingPage}/>
        <Route exact path={ConceptsPagePath} component={ConceptsPage}/>
        <Route exact path={ErrorPagePath} component={ErrorPage}/>
        <Route path="/*">
          <Redirect to={ErrorPagePath}/>
        </Route>
      </Switch>
    </Router>
  );
}
