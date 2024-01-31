import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../redux/store";
import { signup } from "../redux/slices/authSlice";

const RegisterModal = ({
  handleSignUpOpen,
}: {
  handleSignUpOpen: () => void;
}) => {
  const initialState = {
    name: "",
    password: "",
    confirmpass: "",
  };
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState(initialState);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.password !== data.confirmpass) {
      toast.error("Your password doesn't match!");
      return;
    }
    dispatch(signup(data));
    alert("회원가입이 완료되었습니다.");
    handleSignUpOpen();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <form className="modal-btn" onSubmit={handleSubmit}>
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
        onClick={handleSignUpOpen}
      >
        Close
      </button>
    </form>
  );
};
export default RegisterModal;
