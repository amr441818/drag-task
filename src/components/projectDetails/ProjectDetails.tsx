import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import DropArea from "../DropArea/DropArea";
import Card from "../Card/Card";
import CustomModal from "../reusableComponents/CustomModal";
import { modelActions } from "../../store/modelSlice";
import { projectActions } from "../../store/projectsSlice";
import AddTaskForm from "../taskForm/TaskForm";


export const ProjectDetails = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch()
  
  const { projects } = useSelector((state: RootState) => state.projects);
  const {openModel, modalType} = useSelector((state: RootState)=> state.Model)
  const openModalHandler = ()=>{
   
    dispatch(modelActions.openModel('task'))
  }
  const project = projects.find((project) => project.id === projectId);
  const [itemsArr, setItemArr] = useState(project?.tasks);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const onDropHandler = (status: string, position: number) => {
    if (activeItem === null || activeItem === undefined) return;

    const itemToDrop = itemsArr[activeItem];

    const updatedArr = itemsArr.filter((_, index:number) => index !== activeItem);

    updatedArr.splice(position, 0, { ...itemToDrop, status: status });

     dispatch(projectActions.editTaskStatus({id:project.id,tasks:updatedArr}))

    // setItemArr(updatedArr.sort((a, b) => a.order - b.order));
  };
  useEffect(()=>{
    setItemArr(project?.tasks)
  },[project])
console.log(project)
  return (
    <>
     {openModel && modalType === "task" && (  <CustomModal title="Add project"> <AddTaskForm id={project?.id}/></CustomModal>)}
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3   items-center  p-10 ">
        <h6>{project?.title}</h6>
        <p>{project?.descreption}</p>
      </div>
      <div className="w-full  me-6 flex justify-end">
                    <button
                        type="button"
                        onClick={openModalHandler} 
                        className="text-white flex  me-7 rounded-[6px]  bg-gradient-to-r from-[#019867] to-[#019867] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Add task
                    </button>
                    </div>
      <div className="flex justify-center w-full items-start min-h-[450px]  ">
      <div className="flex  w-full flex-col justify-center border-e-[1px] border-purple-600 p-5 gap-4">
        in progres
          <DropArea onDrop={onDropHandler} status="toDo" position={0} />
          {itemsArr?.map((item, index) => {
            if (item.status === "toDo") {
              return (
                <Card
                  bgColor="bg-purple-700"
                  setActiveItem={setActiveItem}
                  status="toDo"
                  index={index}
                  onDropHandler={onDropHandler}
                  title={item.title}
                />
              );
            }
          })}
        </div>
        <div className="flex flex-col justify-center w-full border-e-[1px] border-purple-600 p-5 gap-4">
          <DropArea onDrop={onDropHandler} status="progress" position={0} />
          {itemsArr?.map((item, index) => {
            if (item.status === "progress") {
              return (
                <Card
                  bgColor="bg-purple-800"
                  setActiveItem={setActiveItem}
                  status="progress"
                  index={index}
                  onDropHandler={onDropHandler}
                  title={item.title}
                />
              );
            }
          })}
        </div>
        <div className="flex flex-col justify-center w-full  p-5 gap-4">
          <DropArea onDrop={onDropHandler} status="completed" position={0} />
          {itemsArr?.map((item, index) => {
            if (item.status === "completed") {
              return (
                <Card
                  bgColor="bg-purple-800"
                  setActiveItem={setActiveItem}
                  status="completed"
                  index={index}
                  onDropHandler={onDropHandler}
                  title={item.title}
                />
              );
            }
          })}
        </div>
        {/* <div className="w-1/3  min-h-[300px] flex justify-center border-e-[1px]">to do </div> 
        <div className="w-1/3 min-h-[300px] h-full flex justify-center border-e-[1px] ">in progress</div>
        <div className="w-1/3  min-h-[300px] h-full flex justify-center border-e-[1px]"> done </div> */}
      </div>
      </div>
    </>
  );
};
