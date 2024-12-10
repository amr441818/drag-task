import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ActionPayload, addTask, projectType } from "../types/projectsType";
type initialStateTypes = {
  projects: projectType[];
};

const initialState: initialStateTypes = {
  projects: [],
};
const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (
      state: initialStateTypes,
      action: PayloadAction<projectType[]>
    ) => {
     state.projects = action.payload
    },
    addProject: (
      state: initialStateTypes,
      action: PayloadAction<{ title: string; descreption: string }>
    ) => {
      const newProject = {
        id: new Date().toString(),
        title: action.payload.title,
        descreption: action.payload.descreption,
        tasks: [],
      };
      state.projects.push(newProject);
      localStorage.setItem("projects", JSON.stringify([...state.projects]));
    },
    editTaskStatus: (
      state: initialStateTypes,
      action: PayloadAction<ActionPayload>
    ) => {
      console.log(action)
     const updatedProjects = [...state.projects]

    //  const project = updatedProjects.find((item:projectType)=> item.id === action.payload.id)
     const projectIndex = updatedProjects.findIndex((item:projectType)=> item.id === action.payload.id)
     
 
     
     updatedProjects[projectIndex].tasks = action.payload.tasks
     state.projects = updatedProjects
      localStorage.setItem("projects", JSON.stringify([...state.projects]));
    },
    addTask: (
      state: initialStateTypes,
      action: PayloadAction<addTask>
    ) => {
      console.log(action)
     const updatedProjects = [...state.projects]

     const project = updatedProjects.find((item:projectType)=> item.id === action.payload.id)
     const projectIndex = updatedProjects.findIndex((item:projectType)=> item.id === action.payload.id)
     if(project){
      project.tasks = [...project.tasks, action.payload.task]
     
      updatedProjects[projectIndex] = project
     }
     
     state.projects = updatedProjects
      localStorage.setItem("projects", JSON.stringify([...state.projects]));
    },
  },
});

export const projectActions = projectsSlice.actions;
export default projectsSlice.reducer;
