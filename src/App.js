import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { RouteList } from './lib/routes';
import { getAllEntriesByConentType } from './utils/contentful';

import Test from './views/Test';
import Navigation from './components/Navigation';

console.log('test', getAllEntriesByConentType('product'));

const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Router>
        <Switch>
          <Route exact path={ RouteList.home }>
            
          </Route>
          <Route path={ RouteList.test }>
            <Test />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
