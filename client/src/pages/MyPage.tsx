import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { deleteUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

type Props = {};

const MyPage = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navi = useNavigate();
  const handleDeleteAccount = () => {
    if (window.confirm("정말 삭제 하시겠습니까?")) {
      dispatch(deleteUser(navi));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">MyPage</h1>
      <button
        onClick={handleDeleteAccount}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        계정 삭제
      </button>
    </div>
  );
};

export default MyPage;
