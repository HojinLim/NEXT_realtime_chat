import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { deleteUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

type Props = {};

const MyPage = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navi = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const handleDeleteAccount = () => {
    if (window.confirm("정말 삭제 하시겠습니까?")) {
      dispatch(deleteUser(navi));
    }
  };
  if (user === null) return <div>ERROR PAGE</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">MyPage</h1>
      <div className="text-black hover:cursor-pointer hover:text-blue-300 hover:underline">
        Hi, {user?.name}
      </div>
      <div className="w-24 h-24 rounded-full overflow-hidden">
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
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
