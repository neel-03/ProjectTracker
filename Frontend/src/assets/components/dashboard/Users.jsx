import React, { useState, useEffect } from "react";
import MyNavbar from "../Navbar";
import {
  Grid,
  Panel,
  Table,
  Loader,
  Button,
  Modal,
  IconButton,
  ButtonToolbar,
  Stack,
  Form,
  InputPicker,
  useToaster,
  Notification,
} from "rsuite";
import axios from "axios";
import EditIcon from "@rsuite/icons/legacy/Edit2";
import DeleteIcon from "@rsuite/icons/legacy/Trash";

const { Column, HeaderCell, Cell } = Table;

export default function Users({ user, active }) {
  const toaster = useToaster();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  const data = ["ADMIN", "MENTOR"].map((item) => ({
    label: item,
    value: item,
  }));

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/api/user`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log('process.env fetch')
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      setShowEditModal(false);
      const res = await axios.put(
        `${import.meta.env.VITE_URL}/api/user`,
        editedUser,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data === "ok") {
        const updatedUsers = users.map((u) =>
          u.id === selectedUser.id ? editedUser : u
        );
        setUsers(updatedUsers);
        toaster.push(
          <Notification
            type={"success"}
            header={"User updated successfully"}
          />,
          { placement: "topEnd" }
        );
      } else if (res.data === "invalid role") {
        toaster.push(
          <Notification type={"error"} header={"please insert valid role"} />,
          { placement: "topEnd" }
        );
      } else if (res.data === "not found") {
        toaster.push(
          <Notification type={"error"} header={"User not found"} />,
          { placement: "topEnd" }
        );
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const deleteUser = async () => {
    try {
      setShowDeleteModal(false);
      await axios.delete(
        `${import.meta.env.VITE_URL}/api/user/${selectedUser.id}`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      const updatedUsers = users.filter((u) => u.id !== selectedUser.id);
      setUsers(updatedUsers);
      toaster.push(
        <Notification
          type="success"
          header={"User deleted successfully..!"}
        />,
        {
          placement: "topEnd",
        }
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <MyNavbar user={user} active={active} />
      <Grid fluid>
        {loading ? (
          <Loader center size="md" content={"Please wait..."} />
        ) : users.length === 0 ? (
          <Panel shaded style={{ margin: "50px" }}>
            <p>No data available</p>
          </Panel>
        ) : (
          <Panel shaded style={{ margin: "50px" }}>
            <Table data={users} autoHeight wordWrap width={800}>
              <Column width={40} align="center" fixed="left">
                <HeaderCell>ID</HeaderCell>
                <Cell dataKey="id" />
              </Column>
              <Column width={200} resizable>
                <HeaderCell>Name</HeaderCell>
                <Cell dataKey="name" />
              </Column>
              <Column width={220} resizable>
                <HeaderCell>Email</HeaderCell>
                <Cell dataKey="email" />
              </Column>
              <Column width={90} resizable>
                <HeaderCell>Role</HeaderCell>
                <Cell dataKey="role" />
              </Column>
              <Column width={250} fixed="right" resizable>
                <HeaderCell>Actions</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <Stack spacing={7}>
                      <IconButton
                        appearance="primary"
                        onClick={() => handleEditUser(rowData)}
                        color="cyan"
                        icon={<EditIcon />}
                      >
                        Edit
                      </IconButton>
                      <IconButton
                        appearance="primary"
                        onClick={() => handleDeleteUser(rowData)}
                        color="red"
                        icon={<DeleteIcon />}
                      >
                        Delete
                      </IconButton>
                    </Stack>
                  )}
                </Cell>
              </Column>
            </Table>
          </Panel>
        )}
      </Grid>
      <Modal
        backdrop="static"
        open={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onClose={() => setShowDeleteModal(false)}
      >
        <Modal.Header>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete user "{selectedUser?.name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteUser} appearance="primary" color="red">
            Yes, Delete
          </Button>
          <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        backdrop="static"
        open={showEditModal}
        onHide={() => setShowEditModal(false)}
        onClose={() => setShowEditModal(false)}
      >
        <Modal.Header>
          <Modal.Title>
            <strong>Edit User</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Name</Form.ControlLabel>
              <Form.Control
                name="name"
                value={editedUser?.name}
                style={{ width: 224 }}
                onChange={(value) =>
                  setEditedUser({ ...editedUser, name: value })
                }
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control
                name="email"
                style={{ width: 224 }}
                value={editedUser?.email}
                onChange={(value) =>
                  setEditedUser({ ...editedUser, email: value })
                }
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Role</Form.ControlLabel>
              <InputPicker
                data={data}
                value={editedUser?.role}
                style={{ width: 224 }}
                onChange={(value) =>
                  setEditedUser({ ...editedUser, role: value })
                }
              />
            </Form.Group>
            <ButtonToolbar>
              <Button onClick={handleSaveEdit} appearance="primary">
                Save User
              </Button>
              <Button onClick={() => setShowEditModal(false)}>Cancel</Button>
            </ButtonToolbar>
          </Form>
        </Modal.Body>
        <Modal.Footer>{JSON.stringify(editedUser, 2, null)}</Modal.Footer>
      </Modal>
    </>
  );
}
