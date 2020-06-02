import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { RouteList } from './lib/routes';

import CountriesContextProvider from 'utils/context/CountriesContextProvider';
import TeamsContextProvider from 'utils/context/TeamsContextProvider';
import { ShoppingCartProvider } from 'utils/context/ShoppingCartProvider';
import Navigation from 'components/Navigation';
import Home from 'views/Home';
import Cart from 'views/Cart';
import Login from 'views/Login';
import Register from 'views/Register';
import Test from 'views/Test';

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
              <Route path={ RouteList.cart }>
                <Cart />
              </Route>
              <Route path={ RouteList.login }>
                <Login />
              </Route>
              <Route path={ RouteList.register }>
                <Register />
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
