import axios from "axios";
import {
  DELETE_PROJECT,
  GET_ERRORS,
  GET_PROJECTS,
  ADD_PROJECT,
  UPDATE_PROJECT,
} from "./actionTypes";

export const addProject = (project) => async (dispatch) => {
  try {
    if (project.id) {
      const response = await axios.post(`${import.meta.env.VITE_URL}/api/project`, project, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const updatedProject = response.data;
      dispatch({
        type: UPDATE_PROJECT,
        payload: updatedProject,
      });
    } else {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/project`,
        project,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      const newProject = response.data;
      console.log("res data...", response.data);
      dispatch({
        type: ADD_PROJECT,
        payload: newProject,
      });
    }
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getAllProjects = () => async (dispatch) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_URL}/api/project/all`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    console.log(res);
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const deleteProject = (id) => async (dispatch) => {
  await axios.delete(`${import.meta.env.VITE_URL}/api/project/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
  dispatch({
    type: DELETE_PROJECT,
    payload: id,
  });
};
