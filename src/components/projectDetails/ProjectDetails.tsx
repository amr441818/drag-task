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
import { projectType, taskType } from "../../types/projectsType";

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
  const project = projects.find(
    (project: projectType) => project.id === projectId
  );
  const [itemsArr, setItemArr] = useState<taskType[]>([]);
  const [projectIdd, setProjectId] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const onDropHandler = (status: string, position: number) => {
    if (activeItem === null || activeItem === undefined) return;

    const itemToDrop = itemsArr[activeItem];

    const updatedArr = itemsArr.filter(
      (_, index: number) => index !== activeItem
    );

    updatedArr.splice(position, 0, { ...itemToDrop, status: status });

    if (project) {
      dispatch(
        projectActions.editTaskStatus({ id: project.id, tasks: updatedArr })
      );
    }
  };
  useEffect(() => {
    if (project) {
      setItemArr(project?.tasks);
      setProjectId(project.id);
    }
  }, [project]);

  return (
    <>
      {openModel && modalType === "task" && (
        <CustomModal title="Add project">
          {projectIdd && <AddTaskForm id={projectIdd} />}
        </CustomModal>
      )}
      <div className="flex flex-col gap-4 m-4 md:m-[40px]">
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

        <div className="flex justify-center flex-col lg:flex-row   w-full min-h-[450px]  bg-[#f9f9f9] rounded-[12px] p-4 ">
          <div className="flex   flex-col items-center w-full border-e-[1px] border-[#f6edc9] p-5 gap-4">
            <p className=" rounded-[12px] text-center py-2 min-w-[200px]  px-9 font-bold bg-[#f6edc9] text-black taxt-[22px] ">
              To Do
            </p>

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

          <div className="flex flex-col  items-center w-full border-e-[1px] border-[#f5e0c9] p-5 gap-4">
            <p className=" rounded-[12px] text-center py-2  min-w-[200px] px-9 font-bold bg-[#f5e0c9] text-w taxt-[22px] ">
              In Progress
            </p>
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
          <div className="flex flex-col items-center w-full border-[#eeeeee] p-5 gap-4">
            <p className=" rounded-[12px] text-center py-2  min-w-[200px] px-9 font-bold bg-[#eeeeee] text-w taxt-[22px] ">
              Completed
            </p>
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
      </div>
      <div className="flex flex-col gap-3     p-10 ">
        <h6 className="text-[22px] font-bold">{project?.title}</h6>
        <p className="text-[16px] text-[#666464]  ">{project?.descreption}</p>
      </div>
    </>
  );
};
