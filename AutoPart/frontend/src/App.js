import './App.css';
import React from 'react';
import {
  Switch,
  Route
} from "react-router";
import Header from './components/header';
import RegisterPage from './components/auth/Register';
import LoginPage from './components/auth/Login';
import HomePage from './components/home';
import UserList from './components/users';

class App extends React.Component {

  render() {
    return (
      <>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/users">
              <UserList />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>

            <Route exact path="/login">
              <LoginPage />
            </Route>

          </Switch>
        </div>
        </>
      
    );
  }
}

export default App;
