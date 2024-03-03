import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Content,
  Form,
  ButtonToolbar,
  Button,
  Panel,
  FlexboxGrid,
  Schema,
  useToaster,
  Notification
} from "rsuite";
import { useNavigate } from "react-router-dom";

export default function LoginCard({ isMobile = false }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const toaster = useToaster()
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const formRef = React.useRef();
  const [formError, setFormError] = useState({});

  const loginModel = Schema.Model({
    email: Schema.Types.StringType()
      .isEmail("Please enter a valid email address.")
      .isRequired("Email is required."),
    password: Schema.Types.StringType().isRequired(
      "Password field is required."
    ),
  });
  const successMessage = <Notification type={"success"} header={'Signed in successfully..!'}/>
  const errorMessage = <Notification type={"error"} header={'Wrong credentials..!'}/>
  const formMessage = <Notification type={"error"} header={'Enter valid details'}/>
  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      toaster.push(formMessage, { placement: "topEnd" });
      return;
    }
    try {
      const res = await axios.post("http://localhost:8080/loginuser", {
        ...state,
      });
      toaster.push(successMessage, { placement: 'topEnd' })
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("role", res.data.role[0].role);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      setUser({
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username'),
        role: localStorage.getItem('role'),
        email: localStorage.getItem('email')
      })
    } catch (error) {
      toaster.push(errorMessage, { placement: "topEnd" });
    }
  };

  const boxStyle = {
    margin: isMobile ? "40px 0px" : "0px",
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  },[user])
  return (
    <Container style={boxStyle}>
      <Content>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={16}>
            <Panel shaded>
              <h3 style={{ color: "#34c2ff" }}>
                <b>Sign in to Project Tracker</b>
              </h3>
              <br />
              <br />
              <Form
                fluid
                ref={formRef}
                onChange={setState}
                onCheck={setFormError}
                formValue={state}
                model={loginModel}
              >
                <Form.Group>
                  <Form.ControlLabel>Email address</Form.ControlLabel>
                  <Form.Control name="email" autoComplete="off" />
                  <Form.HelpText tooltip>Enter your email here</Form.HelpText>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Password</Form.ControlLabel>
                  <Form.Control
                    name="password"
                    type="password"
                    autoComplete="off"
                  />
                  <Form.HelpText tooltip>
                    Enter your password here
                  </Form.HelpText>
                </Form.Group>
                <Form.Group>
                  <ButtonToolbar>
                    <Button
                      type="submit"
                      appearance="primary"
                      block
                      onClick={handleSubmit}
                    >
                      Sign in
                    </Button>
                  </ButtonToolbar>
                </Form.Group>
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
}
