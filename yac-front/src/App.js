import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import * as routes from './constants/routes';
import LandingPage from './components/pages/landing';
import Login from './components/pages/login';
import Signup from './components/pages/signup';
import Chatroom from './components/pages/chatroom';

const App = () => (
  <Router>
    <Route exact path="/" component={LandingPage} />
    <Route exact path={routes.LANDING} component={LandingPage} />
    <Route exact path={routes.LOGIN} component={Login} />
    <Route exact path={routes.SINGNUP} component={Signup} />
    <Route exact path={routes.CHATROOM} component={Chatroom} />
  </Router>
);

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

export default connect(mapStateToProps)(App);
