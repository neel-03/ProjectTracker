import React from "react";
import { Navbar, Nav, Button } from "rsuite";
import SignOut from "@rsuite/icons/legacy/SignOut";

function MyNavbar({ active, setActive, data }) {
  const removeData = (e) => {
    localStorage.clear()
  }
  return (
    <>
      <Navbar appearance="inverse">
        <Navbar.Brand href="/">
          <strong>Project Tracker</strong>
        </Navbar.Brand>
        <Nav activeKey={active}>
          {!data && (
            <Nav.Item href="/" eventKey="1">
              Home
            </Nav.Item>
          )}
          {data && (
            <Nav.Item href="/dashboard" eventKey="10">
              Dashboard
            </Nav.Item>
          )}
          <Nav.Item href="/about" eventKey="2">
            About
          </Nav.Item>
          <Nav.Item href="/contact" eventKey="3">
            Contact
          </Nav.Item>
        </Nav>
        {data && (
          <Nav pullRight>
            <Nav.Item onClick={removeData}>
              <Button color="red" appearance="primary" startIcon={<SignOut />}>
                Sign out
              </Button>
            </Nav.Item>
          </Nav>
        )}
      </Navbar>
    </>
  );
}

export default MyNavbar;
