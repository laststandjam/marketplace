import React from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import Home from "../Home"
import Login from "../Login"
import Signup from "../Signup"
import Tickets from "../Tickets"
import AddTicket from "../AddTicket"
import User from "../User"
import PasswordForget from "../PasswordForget"
import TicketShow from "../TicketShow"

export default ({ doSetCurrentUser, currentUser}) => (
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
    <Route exact path="/add" render={() => <AddTicket currentUser={currentUser} />}/>
    <Route exact path="/user" component={User} />
    <Route exact path="/tickets/:id" component={TicketShow}/>

    <Route exact path="/password-forget" component={PasswordForget}/>
  </Switch>
);
