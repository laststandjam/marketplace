import React, {  Component , useState } from "react";

import NavBar from "./componets/Navbar"
import Routes from "./componets/Routes"

import "./App.css";

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
  render(){
    const { isLoggedIn, currentUser } = this.state;
  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} currentUser={currentUser} doSetCurrentUser={this.doSetCurrentUser} />
      <Routes doSetCurrentUser={this.doSetCurrentUser}/>
    </div>
  );
}
}

export default App;
