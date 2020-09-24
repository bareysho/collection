import React, { Component } from 'react';
import './App.css';
import Home from './pages/home';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import UsersPage from './pages/users';
import User from './pages/user';
import Collection from './pages/collection';
import UserSettings from './pages/userSettings';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import WrappHeader from './components/WrappHeader';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('isLoggedIn') != 'false'
      ? <Component {...props} />
      : <Redirect to='/SignIn' />
  )} />
)

const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('role') === 'admin'
      ? <Component {...props} />
      : <Redirect to='/Home' />
  )} />
)

const App = (props) => {

  const store = props.store;
  return (
    <div>
      <Provider store={store}>
        <WrappHeader />
      </Provider>


      <Route
        exact
        path="/"
        component={Home}
      />
      <Route
        exact
        path="/home"
        component={Home}
      />
      <Route
        exact
        path="/signUp"
        component={SignUp}
      />
      <Route
        exact
        path="/signIn"
        component={SignIn}
      />
      <PrivateRouteAdmin
        exact
        path="/users"
        component={UsersPage}

      />
      <PrivateRoute
        exact
        path="/user/:idUser/settings"
        component={UserSettings}
      />
      <Route
        exact
        path="/user/:idUser"
        component={User}
      />

      <Route
        exact
        path="/collection/:idCollection"
        component={Collection}
      />

    </div>
  )

}

export default App;
