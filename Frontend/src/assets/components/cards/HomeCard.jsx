import React from "react";
import { Panel } from "rsuite";

export default function HomeCard({ isMobile = false }) {
    const style = {
        margin: isMobile?"0px 30px":"0px"
    }
  return (
    <Panel shaded style={style}>
      <h2>
        Welcome to
        <br />
        <b style={{ color: "#34c2ff" }}>
          <h1>Project Tracker</h1>
        </b>
      </h2>
      <br />
      <br />
      <p>
        Keep track of your students' projects easily. Manage projects, and work
        together with your team.
      </p>
    </Panel>
  );
}
