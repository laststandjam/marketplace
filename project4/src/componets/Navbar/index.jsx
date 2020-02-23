import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink exact to="/login">
        Login
      </NavLink>
      <NavLink exact to="/tickets">
          Tickets
      </NavLink>
      <NavLink exact to="/user/">
          Profile
      </NavLink>
    </div>
  );
};

export default Navbar;
