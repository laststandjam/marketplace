import React from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import Home from "../Home"
import Login from "../Login"
import Signup from "../Signup"
import Tickets from "../Tickets"
import AddTicket from "../AddTicket"
import User from "../User"

export default ({ doSetCurrentUser }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      exact
      path="/login"
      render={() => <Login doSetCurrentUser={doSetCurrentUser} />}
    />
    <Route
      exact
      path="/signup"
      render={() => <Signup doSetCurrentUser={doSetCurrentUser} />}
    />
    <Route exact path="/tickets" component={Tickets} />
    <Route exact path="/add" component={AddTicket} />
    <Route exact path="/user" component={User} />
  </Switch>
);
