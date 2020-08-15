import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Signup from './components/Signup';
import Home from './components/Home';
import Error404 from './components/Error404';
import './App.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path="/login">
          <Redirect to="/" />
        </Route>
      <Route path='/signup' component={Signup} />
      <Route component={Error404} />
    </Switch>
  </BrowserRouter>
);

export default App;
