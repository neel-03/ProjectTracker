import React from "react";
import { Navbar, Nav } from "rsuite";

function MyNavbar({ active, user=null }) {
  return (
    <>
      <Navbar appearance="inverse">
        <Navbar.Brand href="/">
          <strong>Project Tracker</strong>
        </Navbar.Brand>
        <Nav activeKey={active}>
          <Nav.Item href="/" eventKey="1">
            {user ? "Dashboard" : "Home"}
          </Nav.Item>
          {user && (
            <Nav.Item href="/users" eventKey="4">
              Users
            </Nav.Item>
          )}
          {user && (
            <Nav.Item href="/projects" eventKey="5">
              Projects
            </Nav.Item>
          )}
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