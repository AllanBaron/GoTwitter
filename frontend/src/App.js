import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Timeline from './pages/Timeline';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/timeline" component={Timeline} />
    </Switch>
  </BrowserRouter>
);

export default App;
