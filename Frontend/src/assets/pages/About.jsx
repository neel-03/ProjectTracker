import React from "react";
import { Grid, Row, Panel, ButtonToolbar, IconButton } from "rsuite";
import Logo from "@rsuite/icons/legacy/Github";
import Technologies from "../components/Technologies";
export default function About() {
   const [isMobile, setIsMobile] = React.useState(false);
   const rowStyle = {
     minWidth: isMobile ? "0px" : "550px",
     maxWidth: isMobile ? "300px" : "700px",
     margin: "70px 0px",
   };
   React.useEffect(() => {
     const handleResize = () => {
       setIsMobile(window.innerWidth < 768);
     };
     handleResize();
     window.addEventListener("resize", handleResize);
     return () => {
       window.removeEventListener("resize", handleResize);
     };
   }, []);
  return (
    <>
      <Grid fluid>
        <Row
          className="show-grid"
          style={rowStyle}
        >
          <Panel shaded>
            <div style={{ maxWidth: "100%", padding: 20 }}>
              <h2>
                About <span style={{ color: "#34c2ff" }}>Project Tracker</span>
              </h2>
              <p>
                A full stack web application designed for faculties, managing
                projects efficiently.
              </p>
              <br />
              <h4>Tachnologies Used</h4>
              <Technologies />
              <br />
              <h4>Source Code</h4>
              <ButtonToolbar style={{ marginTop: "10px" }}>
                <IconButton
                  href="https://github.com/neel-03/ProjectTracker"
                  icon={<Logo />}
                  appearance="default"
                  target="_blank"
                  circle
                />
              </ButtonToolbar>
            </div>
          </Panel>
        </Row>
      </Grid>
    </>
  );
}
