import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { addProject } from "../../../store/actions";
import axios from "axios";

export default function ProjectCard() {
  const toaster = useToaster();
  const dispatch = useDispatch();
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
  const [tempArr, setTempArr] = useState([]);
  const data = ["IN PROGRESS", "COMPLETED"].map((item) => ({
    label: item,
    value: item,
  }));

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/api/user/mentors`,
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

  useEffect(() => {
    const arr = tempArr.flatMap((str) => str.split(/\s*,\s*/));
    setStudents(arr);
  }, [tempArr]);

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
    title: Schema.Types.StringType()
      .isRequired("Title is required")
      .maxLength(
        40,
        "Title length must be less than or equal to 40 characters"
      ),
    description: Schema.Types.StringType()
      .isRequired("Description is required")
      .maxLength(
        500,
        "Description length must be less than or equal to 500 characters"
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
      if (mentorName === '' || students.join(",") === "") {
        toaster.push(
          <Notification
            type={"error"}
            header={"Please fill all the details"}
          />,
          { placement: "topEnd" }
        );
        return
      }
      const updatedProject = {
        ...project,
        studentName: students.join(", "),
        mentor: mentorName,
      };
      setProject(updatedProject);

      await dispatch(addProject(updatedProject));

      toaster.push(successMessage, { placement: "topEnd" });
      setStudents([])
      setTempArr([])
      handleClose();
    } catch (err) {
      console.log(err)
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
              <Form.Control
                name="title"
                accepter={Input}
                autoComplete="off"
                value={project.title}
                onChange={(value) => setProject({ ...project, title: value })}
              />
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
                value={project.status}
                onChange={(value) => setProject({ ...project, status: value })}
                style={{ width: 224 }}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Student Names:</Form.ControlLabel>
              <TagInput
                placeholder="Enter student names"
                value={students}
                onChange={(value) => setTempArr(value)}
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
                value={project.mentor}
                onChange={(value) => setProject({ ...project, mentor: value })}
                style={{ width: 224 }}
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
      </Modal>
    </>
  );
}