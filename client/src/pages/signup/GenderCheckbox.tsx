import { FcBusinessman as MaleIcon } from "react-icons/fc";
import { FcBusinesswoman as FemaleIcon } from "react-icons/fc";

const GenderCheckbox = ({ onCheckboxChange, selectedGender }: any) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          } `}
        >
          {/* <span className="label-text">Male</span> */}
          <MaleIcon
            size={30}
            name="female"
            className={`${
              selectedGender === "male"
                ? "bg-yellow-200"
                : "bg-gray-200 opacity-60"
            } hover:bg-yellow-300 active:bg-gray-400 rounded-full`}
          />
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
        </label>
      </div>

      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer  ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <FemaleIcon
            size={30}
            name="female"
            className={`${
              selectedGender === "female"
                ? "bg-yellow-200"
                : "bg-gray-200 opacity-60"
            } hover:bg-yellow-300 active:bg-gray-400 rounded-full`}
          />
          {/* <span className="label-text">Female</span> */}
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;

// STARTER CODE FOR THIS FILE
// const GenderCheckbox = () => {
// 	return (
// 		<div className='flex'>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer`}>
// 					<span className='label-text'>Male</span>
// 					<input type='checkbox' className='checkbox border-slate-900' />
// 				</label>
// 			</div>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer`}>
// 					<span className='label-text'>Female</span>
// 					<input type='checkbox' className='checkbox border-slate-900' />
// 				</label>
// 			</div>
// 		</div>
// 	);
// };
// export default GenderCheckbox;
