import React from "react";
import { Grid, Row, Panel, ButtonToolbar, IconButton } from "rsuite";
import GithubLogo from "@rsuite/icons/legacy/Github"
import LinkedInLogo from "@rsuite/icons/legacy/Linkedin"

export default function Contact() {
  const [isMobile, setIsMobile] = React.useState(false);
  const rowStyle = {
    minWidth: "400px",
    maxWidth: "700px",
    marginTop: "70px",
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
        <Row className="show-grid" style={rowStyle}>
          <Panel shaded>
            <div style={{ maxWidth: "100%", padding: 20 }}>
              <h2 style={{ color: "#34c2ff" }}>Contact</h2>
              <h4 style={{ margin: "10px 0px" }}>Contact details</h4>
              <div style={{ marginBottom: "5px" }}>
                <strong>Email</strong>
                <p>neelvaghasiya003@gmail.com</p>
              </div>
              <div>
                <strong>Phone</strong>
                <p>+91 6355383364</p>
              </div>
              <br />
              <h4>Get in touch</h4>
              <ButtonToolbar style={{ marginTop: "10px" }}>
                <IconButton
                  href="https://www.linkedin.com/in/neel-vaghasiya-404b10225/"
                  icon={<LinkedInLogo />}
                  appearance="primary"
                  target="_blank"
                  circle
                />
                <IconButton
                  href="https://github.com/neel-03"
                  icon={<GithubLogo />}
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
