import { useState } from "react";
import InputComponent from "../reusableComponents/InputComponent"
import CustomTextAria from "../reusableComponents/CustomTextAria";
import { projectActions } from "../../store/projectsSlice";
import { useDispatch } from "react-redux";
import { modelActions } from "../../store/modelSlice";
import { showAlert } from "../Error";

type formDataTypes = {
    title:string;
    description:string;
}
const initalFormData ={
    title:'',
    description:'',
}
const AddProjectForm = () => {
    const dispatch  = useDispatch();
const [formData, setFormData] = useState <formDataTypes>(initalFormData)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
    };
    const submitHandler = ()=>{
      dispatch(projectActions.addProject({title:formData.title, descreption:formData.description}))
      setFormData(initalFormData)
      dispatch(modelActions.closeModel())
      showAlert("Added", "Project Added Successfully")

    }
  return (
    <form action="" onSubmit={submitHandler}>
    <div className="grid gap-4 mb-4 grid-cols-12">
                    <div className="col-span-12">
                       <InputComponent required placeholder="please enter title" label="title" type="text" name="title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className=" col-span-12">
                   
                    <CustomTextAria required  label="description" name="description" onChange={handleChange} value={formData?.description} placeholder="Type Here" />
                    </div>
                    <div className="w-full col-span-12  flex justify-end">
                    <button
                        type="submit"
                        
                        className="text-white flex  rounded-[6px]  bg-[#f29943] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Save
                    </button>
                </div>
                   </div>
                   </form>
  )
}

export default AddProjectForm