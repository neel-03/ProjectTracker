import React from "react";
import LoginCard from "../components/cards/LoginCard";
import HomeCard from "../components/cards/HomeCard";
import { Grid, Row, Col } from "rsuite";

export default function Login() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
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
      <Grid fluid>
        <Row className="show-grid" style={{marginTop:'70px'}}>
          <Col xs={24} sm={24} md={10}>
            <HomeCard isMobile={isMobile}/>
          </Col>
          <Col xs={24} sm={24} md={13}>
            <LoginCard isMobile={isMobile}/>
          </Col>
        </Row>
      </Grid>
    </>
  );
}

{
  /* <Row style={rowStyle}>
  <Col xs={24} sm={12}>
    <HomeCard />
  </Col>
  <Col xs={24} sm={12}>
    <LoginCard />
  </Col>
</Row>; */
}
