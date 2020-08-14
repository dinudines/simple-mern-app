import React from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import Signup from './components/signup';
import Home from './components/home';
import Error404 from './components/error404';
import './App.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/signup' component={Signup} />
      <Route component={Error404} />
    </Switch>
  </BrowserRouter>
);

export default App;
