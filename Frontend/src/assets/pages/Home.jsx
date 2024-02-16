import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "rsuite";
import MyNavbar from "./../components/Navbar";
import Login from "./Login";
import Contact from "../pages/Contact";
import About from "../pages/About";

function Home() {
  const [active, setActive] = useState("1");

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/") {
      setActive("1");
    } else if (pathname === "/about") {
      setActive("2");
    } else if (pathname === "/contact") {
      setActive("3");
    }
  }, []);

  return (
    <Container style={{ height: "100vh" }}>
      <Router>
        <MyNavbar active={active} setActive={setActive} />
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/contact" element={<Contact />}></Route>
          <Route exact path="/about" element={<About />}></Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default Home;
