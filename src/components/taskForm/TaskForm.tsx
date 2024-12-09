import { useState } from "react";
import InputComponent from "../reusableComponents/InputComponent";

import { projectActions } from "../../store/projectsSlice";
import { useDispatch } from "react-redux";
import { modelActions } from "../../store/modelSlice";
import CustomSelect from "../reusableComponents/CustomSelect";

type formDataTypes = {
  title: string;
  status: string;
};
const initalFormData = {
  title: "",
  status: "toDo",
};
const AddTaskForm = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<formDataTypes>(initalFormData);
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    console.log(value);
    setFormData({ ...formData, status: value });
  };
  const submitHandler = () => {
    dispatch(
      projectActions.addTask({
        task: {
          id: new Date().toString(),
          title: formData.title,
          status: formData.status,
        },
        id: id,
      })
    );
    setFormData(initalFormData);
    dispatch(modelActions.closeModel());
  };
  return (
    <form action="" onSubmit={submitHandler}>
    <div className="grid gap-4 mb-4 grid-cols-12">
      <div className="col-span-12">
        <InputComponent
          required
          placeholder="please enter title"
          label="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className=" col-span-12">
        <CustomSelect
          label="status"
          onChange={handleSelectChange}
          options={[
            { value: "toDo", label: "To Do" },
            { value: "progress", label: "In progress" },
            { value: "completed", label: "Completed" },
          ]}
        />
      </div>
      <div className="w-full col-span-12  flex justify-end">
        <button
          type="submit"
         
          className="text-white flex  rounded-[6px]  bg-gradient-to-r from-[#019867] to-[#019867] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </div>
    </div>
    </form>
  );
};

export default AddTaskForm;
