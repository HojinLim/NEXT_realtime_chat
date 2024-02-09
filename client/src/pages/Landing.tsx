import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";

import { useSelector } from "react-redux";

const Landing = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  const [isUser, setIsUser] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-5xl text-blue-500">Chat!</h1>
      {!user ? (
        <button
          onClick={() => {
            setIsUser(true);
            navigate("/login");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          로그인
        </button>
      ) : (
        <button
          onClick={() => {
            navigate("/room");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          GO TO Chat
        </button>
      )}
    </div>
  );
};

export default Landing;
