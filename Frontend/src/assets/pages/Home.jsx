import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "rsuite";
import MyNavbar from "./../components/Navbar";
import Login from "./Login";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Dashboard from "./Dashboard";

function Home() {
  
  const [active, setActive] = useState("1");
  const [data, setData] = useState(false)

  useEffect(() => {
    if (localStorage.length!=0) {
      setData(true)
    } else {
      setData(false)
    }
  },[])

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/") {
      setActive("1");
    } else if (pathname === "/about") {
      setActive("2");
    } else if (pathname === "/contact") {
      setActive("3");
    } else if (pathname === "/dashboard") {
      setActive("10");
    }
  }, []);

  return (
    <Container style={{ height: "100vh" }}>
      <Router>
        <MyNavbar active={active} setActive={setActive} data={data} />
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/contact" element={<Contact />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          {data && (
            <Route exact path="/dashboard" element={<Dashboard />}></Route>
          )}
        </Routes>
      </Router>
    </Container>
  );
}

export default Home;
