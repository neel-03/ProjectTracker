import React from "react";
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
} from "rsuite";
import { useNavigate } from "react-router-dom";

export default function LoginCard({ isMobile = false }) {
  const navigate = useNavigate()
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});

  const loginModel = Schema.Model({
    email: Schema.Types.StringType()
      .isEmail("Please enter a valid email address.")
      .isRequired("Email is required."),
    password: Schema.Types.StringType().isRequired(
      "Password field is required."
    ),
  });

  const handleSubmit = async() => {
    if (!formRef.current.check()) {
      console.error("Form submission Error");
      return;
    }
    const res = await axios.post("http://localhost:8080/loginuser", state);
    console.log(typeof res);
    console.log(res.data);
    localStorage.setItem('mail', res.data.username)
    localStorage.setItem('role', res.data.authorities[0].authority)
    navigate('/dashbord')
  }

  const boxStyle = {
    margin: isMobile?"40px 0px":"0px"
  }

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
              <Form fluid
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
                    <Button type="submit" appearance="primary" block onClick={handleSubmit}>
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
