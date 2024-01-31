import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalButton from "../components/ModalButton";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../redux/store";
import { setUserName } from "../redux/slices/userSlice";

import UserModalButton from "../components/UserModalButton";
import RegisterModal from "../components/RegisterModal";

const Landing = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [reigisterModal, setRegisterModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [isUser, setIsUser] = useState<boolean>(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleButtonClick = () => {
    if (name.trim() !== "") {
      dispatch(setUserName(name));
      navigate("/room");
    }
  };
  const handleClose = () => {
    setShowModal((prev) => !prev);
  };
  const handleSignUpOpen = () => {
    if (reigisterModal) {
      setShowModal(false);
      setRegisterModal((prev) => !prev);
      return;
    }
    setShowModal((prev) => !prev);
    setRegisterModal((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-5xl text-blue-500">Chat!</h1>
      <button
        onClick={() => {
          setIsUser(true);
          setShowModal((prev) => !prev);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        회원으로 입장하기
      </button>
      <button
        onClick={() => {
          setIsUser(false);
          setShowModal((prev) => !prev);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        비회원으로 입장하기
      </button>
      {showModal && isUser ? (
        <UserModalButton
          onClick={handleButtonClick}
          handleNameChange={handleNameChange}
          handleClose={handleClose}
          name={name}
          handleSignUp={handleSignUpOpen}
        />
      ) : showModal && !isUser ? (
        <ModalButton
          onClick={handleButtonClick}
          handleNameChange={handleNameChange}
          handleClose={handleClose}
          name={name}
        />
      ) : null}
      {reigisterModal && <RegisterModal handleSignUpOpen={handleSignUpOpen} />}
    </div>
  );
};

export default Landing;
