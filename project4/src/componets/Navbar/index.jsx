import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import {
  Nav,
  Navbar,
  Form,
  Button,
  NavDropdown,
  FormControl
} from "react-bootstrap";

import firebase from "../../resources/FireBase/firebase";

const NavBar = ({ isLoggedIn, doSetCurrentUser }) => {
  const logoutUser = async () => {
    try {
      await firebase.doSignOut();
      doSetCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">The Peoples Market</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink exact to="/" className="nav-link">
            Home
          </NavLink>
          {isLoggedIn ? (
            <>
              <span
                className={"nav-link"}
                onClick={logoutUser}
              >
                Logout
              </span>
            </>
          ) : (
            <NavLink exact to="/login" className="nav-link">
              Login
            </NavLink>
          )
          }
          <NavLink exact to="/user" className="nav-link">
            Profile
          </NavLink>
          <NavDropdown title="Tickets" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <NavLink exact to="/tickets">
                {" "}
                Browse{" "}
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <NavLink exact to="/create">
                Make a Ticket
              </NavLink>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};


export default NavBar;
