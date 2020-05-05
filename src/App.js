import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { RouteList } from './lib/routes';

import Test from './views/Test';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={ RouteList.home }>
            sasdasd
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
