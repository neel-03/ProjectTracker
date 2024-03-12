import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Panel,
  Stack,
  Container,
  Grid,
  IconButton,
  ButtonToolbar,
  Modal,
  Form,
  InputPicker,
  Input,
  Button,
  Loader,
  TagInput,
  Notification,
  Schema,
  useToaster,
} from "rsuite";
import {
  getAllProjects,
  addProject,
  deleteProject,
} from "../../../store/actions";
import MyNavbar from "../Navbar";
import PlusIcon from "@rsuite/icons/Plus";
import EditIcon from "@rsuite/icons/legacy/Edit2";
import DeleteIcon from "@rsuite/icons/legacy/Trash";
import axios from "axios";

export default function Projects({ user, active }) {
  const dispatch = useDispatch();
  const toaster = useToaster();
  const { projects } = useSelector((state) => state.projects);
  const [mentors, setMentors] = useState([]);
  const [formRef, setFormRef] = useState(React.useRef());
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [students, setStudents] = useState([]);
  const [tempArr, setTempArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({
    title: "",
    description: "",
    status: "",
    studentNames: "",
    mentor: "",
  });
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const arr = tempArr.flatMap((str) => str.split(/\s*,\s*/));
    setStudents(arr);
  }, [tempArr]);

  useEffect(() => {
    const fetchProject = async () => {
      await dispatch(getAllProjects());
      setLoading(false)
    }
    fetchProject()
  }, [dispatch]);

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
    if (selectedProjectId !== null) {
      const selectedProject = projects.find(
        (project) => project.id === selectedProjectId
      );
      if (selectedProject) {
        const selectedMentor = mentors.find(
          (mentor) => mentor.name === selectedProject.mentor
        );
        setProject({
          ...selectedProject,
          mentor: selectedMentor ? selectedMentor.id : null,
        });
        setStudents(selectedProject.studentName.split(", "));
      }
    } else {
      setProject({
        title: "",
        description: "",
        status: "",
        studentNames: "",
        mentor: "",
      });
    }
  }, [selectedProjectId, projects]);

  const handleOpen = (projectId) => {
    setSelectedProjectId(projectId);
    setOpen(true);
  };

  const handleClose = () => {
    setStudents([]);
    setTempArr([]);
    setProject({
      title: "",
      description: "",
      status: "",
      studentNames: "",
      mentor: "",
    });
    setSelectedProjectId(null);
    setOpen(false);
  };

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

  const handleProjectSubmit = async () => {
    if (!formRef.current.check()) {
      toaster.push(
        <Notification type="error" header={"Enter valid details"} />,
        { placement: "topEnd" }
      );
      return;
    }
    if (!students) {
      toaster.push(
        <Notification
          type={"error"}
          header={"Please add at least one student"}
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
      if (mentorName === "" || students.join(",") === "") {
        toaster.push(
          <Notification
            type={"error"}
            header={"Please fill all the details"}
          />,
          { placement: "topEnd" }
        );
        return;
      }
      const updatedProject = {
        ...project,
        studentName: students.join(", "),
        mentor: mentorName,
      };

      await dispatch(addProject(updatedProject));

      toaster.push(
        <Notification
          type={"success"}
          header={"Project saved successfully..!"}
        />,
        { placement: "topEnd" }
      );
      handleClose();
    } catch (err) {
      console.log(err);
      toaster.push(
        <Notification type={"error"} header={"Something went wrong"} />,
        { placement: "topEnd" }
      );
    }
  };

  const handleConfirmDelete = async () => {
    await dispatch(deleteProject(selectedProjectId));
    toaster.push(<Notification type="success" header={"Project deleted successfully..!"} />, {
      placement: "topEnd",
    });
    setConfirmDelete(false);
  };

  const toggleSortOrder = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
  };

  const allProjects = () => {
    if (projects.length === 0) {
      return (
        <Stack direction="column">
          <Panel shaded style={{ width: "400px", margin: "15px 0px" }}>
            <p>No projects available</p>
          </Panel>
        </Stack>
      );
    }

    const filteredProjects = projects.filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredProjects.length === 0) {
      return (
        <Stack direction="column">
          <Panel shaded style={{ width: "400px", margin: "15px 0px" }}>
            <p>No matching projects found</p>
          </Panel>
        </Stack>
      );
    }

    const sortedProjects = filteredProjects.slice().sort((a, b) => {
      if (sortOrder === "asc") {
        return a.status.localeCompare(b.status);
      } else if (sortOrder === "desc") {
        return b.status.localeCompare(a.status);
      }
      return 0;
    });

    return sortedProjects.map((project) => (
      <Panel
        shaded
        key={project.id}
        style={{
          backgroundColor: project.status === "COMPLETED" ? "#efe" : "#fee",
          width: "100%",
          margin: "15px 0px",
        }}
      >
        <Stack>
          <Stack.Item grow={1}>
            <p>{project.id}</p>
          </Stack.Item>
          <Stack.Item grow={30}>
            <Stack justifyContent="space-between">
              <Panel>
                <h3 style={{ marginBottom: "10px" }}>{project.title}</h3>
                <p>Description: {project.description}</p>
                <p>Mentor: {project.mentor}</p>
                <p>Students: {project.studentName}</p>
                <p>Status: {project.status}</p>
              </Panel>
              <Panel>
                <ButtonToolbar>
                  <IconButton
                    appearance="primary"
                    onClick={() => handleOpen(project.id)}
                    color="cyan"
                    icon={<EditIcon />}
                  >
                    Edit
                  </IconButton>
                  <IconButton
                    appearance="primary"
                    onClick={() => {
                      setSelectedProjectId(project.id);
                      setConfirmDelete(true);
                    }}
                    color="red"
                    icon={<DeleteIcon />}
                  >
                    Delete
                  </IconButton>
                </ButtonToolbar>
              </Panel>
            </Stack>
          </Stack.Item>
        </Stack>
      </Panel>
    ));
  };

  return (
    <Container style={{ overflowY: "hidden" }}>
      <MyNavbar user={user} active={active} />
      <Stack style={{ margin: "15px 20px" }} justifyContent="space-between">
        <h2>All projects</h2>
        <Stack spacing={12}>
          <Input
            type="text"
            placeholder="Search by project title"
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
          />

          <Button
            onClick={toggleSortOrder}
            appearance="ghost"
            color={sortOrder === "asc" ? "red" : "green"}
          >
            Sort by {sortOrder === "asc" ? "In Progress" : "Completed"}
          </Button>

          <IconButton
            size="lg"
            icon={<PlusIcon />}
            appearance="primary"
            color="green"
            onClick={handleOpen}
          >
            Add Project
          </IconButton>
        </Stack>
      </Stack>

      {loading && (
        <Stack direction="column">
          <Loader size="md" content={"Please wait..."} />
        </Stack>
      )}
      {!loading && (
        <Grid style={{ overflowY: "scroll", width: "100%" }}>
          {allProjects()}
        </Grid>
      )}
      {/* this modal is for Add/Edit operation */}
      <Modal
        backdrop={"static"}
        keyboard={false}
        open={open}
        onClose={handleClose}
        overflow={true}
      >
        <Modal.Header>
          <Modal.Title>
            <strong>Add/Edit Project</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            ref={formRef}
            onSubmit={handleProjectSubmit}
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
                data={[
                  { label: "IN PROGRESS", value: "IN PROGRESS" },
                  { label: "COMPLETED", value: "COMPLETED" },
                ]}
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
      {/* modal for delete */}
      <Modal
        backdrop={"static"}
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
      >
        <Modal.Header>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleConfirmDelete}
            appearance="primary"
            color="red"
          >
            Yes, Delete
          </Button>
          <Button onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
