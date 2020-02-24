import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./componets/Navbar";
import Home from "./componets/Home";
import Signup from "./componets/Signup";
import Tickets from "./componets/Tickets";
import User from "./componets/User";

import "./App.css";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/tickets" component={Tickets} />
        <Route exact path="/user" component={User} />
      </Switch>
    </div>
  );
}

export default App;
