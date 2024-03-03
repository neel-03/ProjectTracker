import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "rsuite";
import MyNavbar from "../components/Navbar";
import ErrorPage from "./ErrorPage";
import Login from "./Login";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Dashboard from "./Dashboard";
import Protected from "../../Protected";
import Users from "../components/dashboard/Users";
import Projects from "../components/dashboard/Projects";

function Home() {
  const [active, setActive] = useState("1");
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/") {
      setActive("1");
    } else if (pathname.startsWith("/about")) {
      setActive("2");
    } else if (pathname.startsWith("/contact")) {
      setActive("3");
    } else if (pathname.startsWith("/users")) {
      setActive("4");
    } else if (pathname.startsWith("/projects")) {
      setActive("5");
    }
  }, []);

  return (
    <Container style={{ height: "100vh", padding: "5px" }}>
      <Router>
        <Routes>
          <Route path="*" element={<ErrorPage num={"404"} />} />
          <Route exact path="/contact" element={<Contact active={active} />} />
          <Route exacts path="/about" element={<About active={active} />} />
          <Route exact path="/" element={<Login active={active} />} />
          {
            // Passing component as props
          }
          <Route
            exact
            path="/dashboard"
            element={<Protected Component={Dashboard} active={active} />}
          />
          <Route
            exacts
            path="/users"
            element={<Protected Component={Users} active={active} />}
          />
          <Route
            exacts
            path="/projects"
            element={<Protected Component={Projects} active={active} />}
          />
        </Routes>
      </Router>
    </Container>
  );
}

export default Home;
