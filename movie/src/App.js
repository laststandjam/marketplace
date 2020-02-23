import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./componets/Home"
import Login from "./componets/Login"
import Navbar from "./componets/Navbar";
import Signup from "./componets/Signup";
import "./App.css";


import './App.css';

class App extends Component {
  state = {
    currentUser: {},
    isLoggedIn: false,
  };

  doSetCurrentUser = currentUser => {
    this.setState({
      currentUser,
      isLoggedIn: currentUser ? true: false,
    });
  };

  render() {
    const { isLoggedIn, currentUser } = this.state;
    return (
      <div>
        <Navbar isLoggedIn={isLoggedIn} currentUser={currentUser} doSetCurrentUser={this.doSetCurrentUser} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route
            exact
            path='/login'
            render={() => (
              <Login doSetCurrentUser={this.doSetCurrentUser} />
            )}
          />
          <Route
            exact
            path='/signup'
            render={() => (
              <Signup doSetCurrentUser={this.doSetCurrentUser} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;