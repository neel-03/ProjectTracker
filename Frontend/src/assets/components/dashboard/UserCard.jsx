import React, { useState } from "react";
import axios from "axios";
import {
  Panel,
  Row,
  IconButton,
  Modal,
  Button,
  Form,
  InputPicker,
  Notification,
  InputGroup,
  Input,
  ButtonToolbar,
  useToaster,
  Schema,
} from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import PersonIcon from "@rsuite/icons/OperatePeople";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";

export default function UserCard() {
  const toaster = useToaster();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const formRef = React.useRef();
  const [formError, setFormError] = useState({});
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const data = ["ADMIN", "MENTOR"].map((item) => ({
    label: item,
    value: item,
  }));

  const successMessage = (
    <Notification type={"success"} header={"User Added successfully..!"} />
  );

  const errorMessage = (
    <Notification type={"error"} header={"Something went wrong..!"} />
  );

  const formMessage = (
    <Notification type={"error"} header={"Enter valid details"} />
  );

  const userSchema = Schema.Model({
    name: Schema.Types.StringType().isRequired("name is required"),
    email: Schema.Types.StringType()
      .isEmail("Please enter a valid email address.")
      .isRequired("Email is required."),
    password: Schema.Types.StringType().isRequired("Password is required."),
    role: Schema.Types.StringType().isRequired("Role is required"),
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUser({
      name: "",
      email: "",
      role: "",
      password: "",
    });
  };
  const handleVisible = () => setVisible(!visible);

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      toaster.push(formMessage, { placement: "topEnd" });
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8080/api/user",
        {
          ...user,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data === 'exist') {
        toaster.push(
          <Notification type={"error"} header={"User already exists"} />,
          { placement: "topEnd" }
        );
      } else if(res.data==='Invalid role'){
        toaster.push(
          <Notification type={"error"} header={"Please enter valid role"} />,
          { placement: "topEnd" }
        );
      } else {
        toaster.push(successMessage, { placement: "topEnd" });
        handleClose();
      }
    } catch (err) {
      toaster.push(errorMessage, { placement: "topEnd" });
    }
  };

  return (
    <>
      <Panel shaded style={{ padding: "20px" }}>
        <Row justify="center" align="middle">
          <h3 style={{ color: "#34c2ff", marginBottom: "40px" }}>Add User</h3>
        </Row>
        <Row justify="center" align="middle">
          <PersonIcon
            style={{ height: "50px", width: "auto", marginBottom: "30px" }}
          />
        </Row>
        <Row justify="center" align="middle">
          <IconButton
            icon={<PlusIcon />}
            appearance="primary"
            color="green"
            onClick={handleOpen}
          >
            Add
          </IconButton>
        </Row>
      </Panel>
      <Modal
        backdrop={"static"}
        keyboard={false}
        open={open}
        onClose={handleClose}
        overflow={true}
        style={{ padding: "20px" }}
      >
        <Modal.Header>
          <Modal.Title>
            <strong>Add User</strong>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            ref={formRef}
            onCheck={setFormError}
            onSubmit={handleSubmit}
            model={userSchema}
            onChange={(formValue) => setUser(formValue)}
            formValue={user}
          >
            <Form.Group>
              <Form.ControlLabel>name:</Form.ControlLabel>
              <Form.Control name="name" accepter={Input} autoComplete="off" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Email:</Form.ControlLabel>
              <Form.Control name="email" accepter={Input} autoComplete="off" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Select a role:</Form.ControlLabel>
              <InputPicker
                data={data}
                style={{ width: 224 }}
                name="role"
                value={user.role}
                onChange={(value) => setUser({ ...user, role: value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Enter a Password:</Form.ControlLabel>
              <InputGroup inside style={{ width: 224 }}>
                <Form.Control
                  name="password"
                  accepter={Input}
                  type={visible ? "text" : "password"}
                  autoComplete="off"
                />
                <InputGroup.Button onClick={handleVisible}>
                  {visible ? <EyeIcon /> : <EyeSlashIcon />}
                </InputGroup.Button>
              </InputGroup>
            </Form.Group>
            <ButtonToolbar>
              <Button appearance="primary" type="submit">
                Save user
              </Button>
              <Button appearance="subtle" onClick={handleClose}>
                Cancel
              </Button>
            </ButtonToolbar>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
