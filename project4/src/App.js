import React, { Component, useState } from "react";

import NavBar from "./componets/Navbar";
import Routes from "./componets/Routes";

import Firebase from "./resources/FireBase/firebase";

import "./App.css";

class App extends Component {
  state = {
    currentUser: {},
    isLoggedIn: false
  };

  async componentDidMount() {
    await Firebase.auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        const user = await Firebase.database
          .collection("users")
          .where("uid", "==", authUser.uid)
          .get();
      this.setState({
        currentUser: user.docs[0].data(),
        isLoggedIn: true
      })

      }
    });
  }

  doSetCurrentUser = currentUser => {
    this.setState({
      currentUser,
      isLoggedIn: currentUser ? true : false
    });
  };

  render() {
    const { isLoggedIn, currentUser } = this.state;
    return (
      <div>
        <NavBar
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          doSetCurrentUser={this.doSetCurrentUser}
        />
        <Routes currentUser={currentUser} doSetCurrentUser={this.doSetCurrentUser} />
      </div>
    );
  }
}

export default App;
