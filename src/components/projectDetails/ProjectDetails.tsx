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
import { FaPlus } from "react-icons/fa6";

export const ProjectDetails = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const { projects } = useSelector((state: RootState) => state.projects);
  const { openModel, modalType } = useSelector(
    (state: RootState) => state.Model
  );
  const openModalHandler = () => {
    dispatch(modelActions.openModel("task"));
  };
  const project = projects.find((project) => project.id === projectId);
  const [itemsArr, setItemArr] = useState(project?.tasks);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const onDropHandler = (status: string, position: number) => {
    if (activeItem === null || activeItem === undefined) return;

    const itemToDrop = itemsArr[activeItem];

    const updatedArr = itemsArr.filter(
      (_, index: number) => index !== activeItem
    );

    updatedArr.splice(position, 0, { ...itemToDrop, status: status });

    dispatch(
      projectActions.editTaskStatus({ id: project.id, tasks: updatedArr })
    );

    // setItemArr(updatedArr.sort((a, b) => a.order - b.order));
  };
  useEffect(() => {
    setItemArr(project?.tasks);
  }, [project]);
  console.log(project);
  return (
    <>
      {openModel && modalType === "task" && (
        <CustomModal title="Add project">
          {" "}
          <AddTaskForm id={project?.id} />
        </CustomModal>
      )}
      <div className="flex flex-col gap-4 m-[40px]">

       

        <div className="w-full  me-6 flex justify-end">
          <button
            type="button"
            onClick={openModalHandler}
            className="text-white flex  me-7 rounded-[6px]  bg-[#f29943]  py-3 px-5 items-center gap-3"
          >
            <span className="font-semibold text-[18px]">Add task</span>{" "}
            <FaPlus className="size-4 font-semibold " />
          </button>
        </div>


        <div className="flex justify-center   w-full min-h-[450px]  bg-[#f9f9f9] rounded-[12px] p-4 ">

          <div className="flex   flex-col w-full border-e-[1px] border-[#f6edc9] p-5 gap-4">

            <p className=" rounded-[12px] text-center py-2   px-9 font-bold bg-[#f6edc9] text-black taxt-[22px] ">To Do</p>
            
            <DropArea onDrop={onDropHandler} status="toDo" position={0} />
            
            {itemsArr?.map((item, index) => {
              if (item.status === "toDo") {
                return (
                  <Card
                    bgColor="bg-[#f6edc9]"
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
          
          <div className="flex flex-col justify-center w-full border-e-[1px] border-[#f5e0c9] p-5 gap-4">
            <div className="flex justify-center ">In progress</div>
            <DropArea onDrop={onDropHandler} status="progress" position={0} />
            {itemsArr?.map((item, index) => {
              if (item.status === "progress") {
                return (
                  <Card
                    bgColor="bg-[#f5e0c9]"
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
          <div className="flex flex-col justify-center w-full border-[#eeeeee] p-5 gap-4">
            <div className="flex justify-center">Completed</div>
            <DropArea onDrop={onDropHandler} status="completed" position={0} />
            {itemsArr?.map((item, index) => {
              if (item.status === "completed") {
                return (
                  <Card
                    bgColor="bg-[#eeeeee]"
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
          
        </div>
        <div className="flex flex-col gap-3     p-10 ">
          <h1>{project?.title}</h1>
          <p>{project?.descreption}</p>
        </div>
      </div>
    </>
  );
};
