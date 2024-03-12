import React, { useState, useEffect } from "react";
import {
  Grid,
  Row,
  Col,
  Panel,
  Stack,
  useToaster,
  IconButton,
  Notification,
} from "rsuite";
import { useNavigate } from "react-router-dom";
import SignOut from "@rsuite/icons/legacy/SignOut";
import MyNavbar from "../components/Navbar";
import UserCard from "../components/dashboard/UserCard";
import ProjectCard from "../components/dashboard/ProjectCard";

export default function Dashboard({ user, active }) {
  const navigate = useNavigate();
  const toaster = useToaster();
  const [data, setData] = useState(user);
  const handleSignOut = () => {
    localStorage.clear();
    toaster.push(
      <Notification type={"success"} header={"Signed out successfully..!"} />,
      { placement: "topEnd" }
    );
    setData(null);
  };
  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data]);
  return (
    <>
      <MyNavbar active={active} user={user} />
      <Grid fluid style={{ width: "100%" }}>
        <Row style={{ margin: "20px" }}>
          <Panel shaded>
            <Row style={{ margin: "20px" }}>
              <h1>
                Hello, <span style={{ color: "#34c2ff" }}>{user.username}</span>
                ...!
              </h1>
            </Row>
            <Row style={{ margin: "20px" }}>
              <Col xs={24} sm={24} md={12}>
                <Stack wrap spacing={7}>
                  <h5>
                    <span>Email: </span>
                    {user.email}
                  </h5>
                </Stack>
                <Stack wrap spacing={7}>
                  <h5>
                    <span>Role: </span>
                    {user.role.toLowerCase()}
                  </h5>
                </Stack>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <IconButton
                  appearance="primary"
                  color="red"
                  icon={<SignOut />}
                  style={{ float: "right" }}
                  onClick={handleSignOut}
                >
                  Sign Out
                </IconButton>
              </Col>
            </Row>
          </Panel>
        </Row>
        <Row style={{ margin: "20px" }}>
          {user.role === 'ADMIN' &&
            <Col xs={24} sm={24} md={12}>
            <UserCard />
          </Col>}
          <Col xs={24} sm={24} md={12}>
            <ProjectCard />
          </Col>
        </Row>
      </Grid>
    </>
  );
}
