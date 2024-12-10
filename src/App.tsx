import { Outlet } from "react-router-dom";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectActions } from "./store/projectsSlice";
import { RootState } from "./store";
import CustomModal from "./components/reusableComponents/CustomModal";
import AddProjectForm from "./components/addProjectForm/AddProjectForm";




function App() {

  const dispatch = useDispatch()
  const {openModel, modalType} = useSelector((state: RootState)=> state.Model)
  useEffect(()=>{
const projects = localStorage.getItem('projects')
if(projects){
  const parsedProjects = JSON.parse(projects)
  dispatch(projectActions.setProjects(parsedProjects))
}
},[])
  return (
    <>
            {openModel  && modalType === "project" && (  <CustomModal title="Add project"> <AddProjectForm/></CustomModal>)}
      <div className="flex ">
          <SidebarProvider
          className="w-auto"
          >
            <AppSidebar />
            <main>
              <SidebarTrigger />
              
            </main>
          </SidebarProvider>
        

        <div className=" w-full "><Outlet/></div>
      </div>
    </>
  );
}

export default App;
