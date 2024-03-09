import {
  ADD_PROJECT,
  DELETE_PROJECT,
  GET_PROJECTS,
  UPDATE_PROJECT,
} from "../actionTypes";

const initialState = {
  projects: [],
};

export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project
        ),
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };

    default:
      return state;
  }
}
