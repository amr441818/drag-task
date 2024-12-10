import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { modelActions } from "../store/modelSlice";

const Home = () => {
  const dispatch = useDispatch();

  const openModalHandler = () => {
    dispatch(modelActions.openModel("project"));
  };
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div
        className="bg-[#f29943] rounded-[4px] flex gap-4 justify-center hover:bg-[#e9a45f] hover:text-white text-white p-6"
        onClick={openModalHandler}
      >
        <span className="font-semibold text-[18px]">Add new project</span>{" "}
        <FaPlus className="size-[30px] font-semibold " />
      </div>
    </div>
  );
};

export default Home;
