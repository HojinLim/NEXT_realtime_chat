import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../redux/store";
import { register } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FcBusinessman as MaleIcon } from "react-icons/fc";
import { FcBusinesswoman as FemaleIcon } from "react-icons/fc";
import { TOAST_OPTION } from "../constants/setting";

type Props = {};

const RegisterPage = (props: Props) => {
  const initialState = {
    name: "",
    password: "",
    confirmpass: "",
    gender: "",
  };
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState(initialState);
  const navi = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.password !== data.confirmpass) {
      toast.error("Your password doesn't match!", TOAST_OPTION);
      return;
    }
    if (data.gender === "") {
      toast.error("Please select your gender", TOAST_OPTION);
      return;
    }
    if (data.name.length < 3) {
      toast.error("Name must be at least 3 characters", TOAST_OPTION);
      return;
    }

    dispatch(
      register({
        formData: {
          name: data.name,
          password: data.password,
          gender: data.gender,
        },
        navi,
      })
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <form className="modal-Container" onSubmit={handleSubmit}>
        {/* 성별 선택 */}
        <div className="flex-row flex">
          <MaleIcon
            size={30}
            className={`${
              data.gender === "male"
                ? "bg-yellow-200"
                : "bg-gray-200 opacity-60"
            } hover:bg-yellow-300 active:bg-gray-400 rounded-full`}
            name="man"
            onClick={() => setData((prev) => ({ ...prev, gender: "male" }))}
          />
          <FemaleIcon
            size={30}
            className={`${
              data.gender === "female"
                ? "bg-yellow-200"
                : "bg-gray-200 opacity-60"
            } hover:bg-yellow-300 active:bg-gray-400 rounded-full`}
            name="female"
            onClick={() => setData((prev) => ({ ...prev, gender: "female" }))}
          />
        </div>
        <input
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="mt-3 p-2 border border-gray-300 rounded"
        />
        <input
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder="password"
          maxLength={12}
          className="mt-3 p-2 border border-gray-300 rounded"
        />
        <input
          name="confirmpass"
          type="password"
          value={data.confirmpass}
          onChange={handleChange}
          maxLength={12}
          placeholder="confirm password"
          className="mt-3 p-2 border border-gray-300 rounded"
        />

        <button
          className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-5/6"
          type="submit"
        >
          Sign Up
        </button>
        <button
          type="button"
          className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          // onClick={handleSignUpOpen}
        >
          Close
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
