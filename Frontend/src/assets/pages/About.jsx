import React from "react";
import { Grid, Row, Panel, ButtonToolbar, IconButton } from "rsuite";
import Logo from "@rsuite/icons/legacy/Github";
import Technologies from "../components/Technologies";
export default function About() {
  return (
    <>
      <Grid fluid>
        <Row
          className="show-grid"
          style={{ maxWidth: "800px", marginTop: "70px" }}
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
