import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import * as routes from './constants/routes';
import LandingPage from './components/pages/landing';
import Login from './components/pages/login';
import Signup from './components/pages/signup';
import Chatroom from './components/pages/chatroom';
import Loading from './components/pages/loading';
import firebase from './store/firebase';
import { FETCH_USER, SET_LOADING, ERASE_USER } from './constants/actions';

export const Auth = React.createContext();

const AuthContext = ({
  children, setUser, setLoading, loading, eraseUser,
}) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setUser(user.uid);
        setLoading(false);
      } else {
        eraseUser();
        setLoading(false);
      }
    });
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <Auth.Provider>
      {children}
    </Auth.Provider>
  );
};

const App = ({
  setUser, setLoading, loading, eraseUser,
}) => (
  <AuthContext setUser={setUser} eraseUser={eraseUser} setLoading={setLoading} loading={loading}>
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path={routes.LANDING} component={LandingPage} />
        <Route exact path={routes.LOGIN} component={Login} />
        <Route exact path={routes.SINGNUP} component={Signup} />
        <Route exact path={routes.CHATROOM} component={Chatroom} />
      </Switch>
    </Router>
  </AuthContext>
);

const mapStateToProps = (state) => ({
  user: state.userState.user,
  loading: state.userState.loading,
});
const mapDispatchToProps = (dispatch) => ({
  setUser: (userUid) => dispatch({ type: FETCH_USER, data: { userUid } }),
  eraseUser: () => dispatch({ type: ERASE_USER }),
  setLoading: (loading) => dispatch({ type: SET_LOADING, payload: { loading } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
