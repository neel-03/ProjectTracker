import React from "react";
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

export default function LoginCard({ isMobile = false }) {

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

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error("Form submission Error");
      return;
    }
    console.log(state, "user State")
    alert(state)
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
