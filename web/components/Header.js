import React, { useState } from "react"

import "./Header.styles.scss"

import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from "reactstrap"

const Header = () => (
  <div id="app-header">
    <Navbar dark expand="sm" fixed="top" className="jh-navbar">
      <NavbarBrand className="brand-logo">
        <span className="brand-title">Sealed Network</span>
      </NavbarBrand>
    </Navbar>
  </div>
);

export default Header
