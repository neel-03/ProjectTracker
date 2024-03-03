import React, { useState, useEffect } from "react";
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
  TagInput,
  Input,
  ButtonToolbar,
  useToaster,
  Schema,
} from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import ProjectIcon from "@rsuite/icons/Project";

export default function ProjectCard() {
  const toaster = useToaster();
  const [open, setOpen] = useState(false);
  const [mentors, setMentors] = useState([]);
  const formRef = React.useRef();
  const [project, setProject] = useState({
    title: "",
    description: "",
    status: "",
    studentName: "",
    mentor: "",
  });
  const [students, setStudents] = useState([]);
  const data = ["IN PROGRESS", "COMPLETED"].map((item) => ({
    label: item,
    value: item,
  }));

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/mentors",
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        setMentors(response.data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };
    fetchMentors();
  }, []);

  const successMessage = (
    <Notification type={"success"} header={"Project Added successfully..!"} />
  );

  const errorMessage = (
    <Notification type={"error"} header={"Something went wrong..!"} />
  );

  const formMessage = (
    <Notification type={"error"} header={"Enter valid details"} />
  );

  const projectSchema = Schema.Model({
    title: Schema.Types.StringType().isRequired("Title is required"),
    description: Schema.Types.StringType().isRequired(
      "Description is required"
    ),
    status: Schema.Types.StringType().isRequired("Status is required"),
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setProject({
      title: "",
      description: "",
      status: "",
      studentName: "",
      mentor: "",
    });
    setStudents([]);
  };

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      toaster.push(formMessage, { placement: "topEnd" });
      return;
    }
    if (!students) {
      toaster.push(
        <Notification
          type={"error"}
          header={"Please add atleast one student"}
        />,
        { placement: "topEnd" }
      );
      return;
    }
    try {
      const selectedMentor = mentors.find(
        (mentor) => mentor.id === project.mentor
      );
      const mentorName = selectedMentor ? selectedMentor.name : "";
      const updatedProject = {
        ...project,
        studentName: students.join(","),
        mentor: mentorName,
      };
      setProject(updatedProject);

      // Submit the form with updated project state
      const res = await axios.post(
        "http://localhost:8080/api/project",
        {
          ...updatedProject,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log('res:::::',res.data);
      console.log('proj::::', project)
      toaster.push(successMessage, { placement: "topEnd" });
      handleClose();
    } catch (err) {
      toaster.push(errorMessage, { placement: "topEnd" });
    }
  };

  return (
    <>
      <Panel shaded style={{ padding: "20px" }}>
        <Row justify="center" align="middle">
          <h3 style={{ color: "#34c2ff", marginBottom: "40px" }}>
            Add Project
          </h3>
        </Row>
        <Row justify="center" align="middle">
          <ProjectIcon
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
      >
        <Modal.Header>
          <Modal.Title>
            <strong>Add Project</strong>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            model={projectSchema}
            formValue={project}
            onChange={(formValue) => setProject(formValue)}
          >
            <Form.Group>
              <Form.ControlLabel>Title:</Form.ControlLabel>
              <Form.Control name="title" accepter={Input} autoComplete="off" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Description:</Form.ControlLabel>
              <textarea
                name="description"
                className="rs-input"
                value={project.description}
                onChange={(e) =>
                  setProject({ ...project, description: e.target.value })
                }
                autoComplete="off"
                style={{
                  width: "100%",
                  minHeight: "100px",
                  resize: "vertical",
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Select a status:</Form.ControlLabel>
              <InputPicker
                data={data}
                style={{ width: 224 }}
                name="status"
                value={project.status}
                onChange={(value) => setProject({ ...project, status: value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Student Names:</Form.ControlLabel>
              <TagInput
                placeholder="Enter student names"
                value={students}
                onChange={(value) => setStudents(value)}
                menuStyle={{ width: 300 }}
                style={{ width: "224px", minHeight: "auto", height: "auto" }}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Mentor:</Form.ControlLabel>
              <InputPicker
                data={mentors.map((mentor) => ({
                  label: mentor.name,
                  value: mentor.id,
                }))}
                style={{ width: 224 }}
                name="mentor"
                value={project.mentor}
                onChange={(value) => setProject({ ...project, mentor: value })}
              />
            </Form.Group>
            <ButtonToolbar>
              <Button appearance="primary" type="submit">
                Save Project
              </Button>
              <Button appearance="subtle" onClick={handleClose}>
                Cancel
              </Button>
            </ButtonToolbar>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {JSON.stringify(project, null, 2)}
          {JSON.stringify(students, null, 2)}
        </Modal.Footer>
      </Modal>
    </>
  );
}