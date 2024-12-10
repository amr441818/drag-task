
import Select, { SingleValue } from "react-select";
import { customSelectProps } from "../../types/projectsType";

const CustomSelect = (props: customSelectProps) => {
  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      borderColor: "transparent", 
      borderWidth: 0.5,
      borderRadius: 4,
    }),
    control: (provided: any, ) => ({
      ...provided,
      borderColor: "#d1d5db", 
      "&:hover": {
        borderColor: "#d1d5db", 
      },
      boxShadow: "none", 
    }),
    option: (provided: any, ) => ({
      ...provided,
      backgroundColor:  "white",
      color:  "black",
    }),
    menu: (provided: any) => ({
      ...provided,
      borderColor: "red",
    }),
  };
  const handleSelectChange = (
    newValue: SingleValue<{ value: string; label: string }>
  ) => {
    const selectedValue = newValue ? newValue.value : 0;
    //@ts-ignore
    props.onChange(selectedValue);
  };
  return (
    <>
      <div className="relative ">
        <label htmlFor="" className=" text-[16px]  font-[500]   pb-1 ">
          {" "}
          {props.label}
        </label>

        <Select
          defaultValue={props?.options[0]}
          className="select_styles"
          options={props?.options}
          isSearchable={false}
          onChange={handleSelectChange}
          styles={customStyles}
        />
      </div>
    </>
  );
};

export default CustomSelect;
