import React from "react";
import { Navbar, Nav } from "rsuite";

function MyNavbar({ active, setActive }) {
  return (
    <>
      <Navbar appearance="inverse">
        <Navbar.Brand href="/">
          <strong>Project Tracker</strong>
        </Navbar.Brand>
        <Nav activeKey={active}>
          <Nav.Item href="/" eventKey="1">
            Home
          </Nav.Item>
          <Nav.Item href="/about" eventKey="2">
            About
          </Nav.Item>
          <Nav.Item href="/contact" eventKey="3">
            Contact
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
}

export default MyNavbar;
