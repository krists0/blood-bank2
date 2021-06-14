import React, { Component } from 'react';

import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './auth/setAuthToken.js';
import { setCurrentUser, logoutUser } from './actions/authActions';
import userMainp from "./userMainp"
import AuthBox from './auth';




class App extends Component {
//
    constructor(props){
        super(props);


    }





  render(){

      // Check for token
      if (localStorage.jwtToken) {
          // Set auth token header auth
          setAuthToken(localStorage.jwtToken);
          // Decode token and get user info and exp
          const decoded = jwt_decode(localStorage.jwtToken);
          // Set user and isAuthenticated
          this.props.store.dispatch(setCurrentUser(decoded));

          // Check for expired token
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
              // Logout user
              this.props.store.dispatch(logoutUser());
              // Clear current Profile
              // store.dispatch(clearCurrentProfile());
              // Redirect to login
              window.location.href = '/showLoginReg';
          }
      }

  return (
     <>
          <Router>
          <Switch>
          <Route exact path="/" />
          <Route exact path="/showLoginReg" component={AuthBox}/>
          <Route exact path="/userMainp" component={userMainp}/>
          <Route exact path="/LandingPage" />

          </Switch>
          </Router>
    </>
  
  );
  }
}

export default App;
