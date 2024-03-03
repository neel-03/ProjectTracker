import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "../components/cards/LoginCard";
import HomeCard from "../components/cards/HomeCard";
import { Grid, Row, Col } from "rsuite";
import MyNavbar from "../components/Navbar";

export default function Login({ active }) {
 
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = React.useState(false);

 useEffect(() => {
   const username = localStorage.getItem("username");
   const role = localStorage.getItem("role");
   const token = localStorage.getItem("token");
   if (token && username && role) {
     navigate("/dashboard");
   }
 }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [])

  return (
    <>
      <MyNavbar active={active}/>
      <Grid fluid>
        <Row className="show-grid" style={{ marginTop: "70px" }}>
          <Col xs={24} sm={24} md={10}>
            <HomeCard isMobile={isMobile} />
          </Col>
          <Col xs={24} sm={24} md={13}>
            <LoginCard isMobile={isMobile} />
          </Col>
        </Row>
      </Grid>
    </>
  );
}

