import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { RouteList } from './lib/routes';
import TeamsContextProvider from 'utils/context/TeamsContextProvider';

import Navigation from 'components/Navigation';
import Test from 'views/Test';
import Home from 'views/Home';

const App = () => {
  return (
    <TeamsContextProvider>
      <Navigation />
      <Router>
        <Switch>
          <Route exact path={ RouteList.home }>
            <Home />
          </Route>
          <Route path={ RouteList.test }>
            <Test />
          </Route>
        </Switch>
      </Router>
    </TeamsContextProvider>
  );
}

export default App;
