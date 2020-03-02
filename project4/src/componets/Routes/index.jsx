import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Tickets from "../../pages/Tickets";
import AddTicket from "../../pages/AddTicket";
import User from "../../pages/User";
import PasswordForget from "../../pages/PasswordForget";
import TicketShow from "../../pages/TicketShow";

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

    <Route exact path="/tickets" render={() => <Tickets />} />
    <Route exact path="/add" render={() => <AddTicket />} />
    <Route exact path="/user" component={User} />
    <Route
      exact
      path="/tickets/:id"
      render={props => <TicketShow {...props} />}
    />

    <Route exact path="/password-forget" component={PasswordForget} />
  </Switch>
);
