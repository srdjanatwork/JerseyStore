import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { RouteList } from './lib/routes';

import CountriesContextProvider from 'utils/context/CountriesContextProvider';
import TeamsContextProvider from 'utils/context/TeamsContextProvider';
import { ShoppingCartProvider } from 'utils/context/ShoppingCartProvider';
import Navigation from 'components/Navigation';
import Test from 'views/Test';
import Home from 'views/Home';

const App = () => {
  return (
    <ShoppingCartProvider>
      <CountriesContextProvider>
        <TeamsContextProvider>
          <Router>
            <Navigation />
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
      </CountriesContextProvider>
    </ShoppingCartProvider>
  );
}

export default App;
