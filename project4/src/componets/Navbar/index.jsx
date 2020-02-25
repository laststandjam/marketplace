import React from "react";
import { NavLink } from "react-router-dom";
import {
  Nav,
  Navbar,
  Form,
  Button,
  NavDropdown,
  FormControl
} from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">The Peoples Market</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink exact to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink exact to="/login" className="nav-link">
            Login
          </NavLink>
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
              <NavLink exact to="/add">
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

// const Navbar = () => {
//   return (
//     <div>
//       <NavLink exact to="/">
//         Home
//       </NavLink>
//       <NavLink exact to="/login">
//         Login
//       </NavLink>
//       <NavLink exact to="/tickets">
//         Tickets
//       </NavLink>
//       <NavLink exact to="/user/">
//         Profile
//       </NavLink>
//     </div>
//   );
// };

export default NavBar;
