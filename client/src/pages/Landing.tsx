import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../redux/store";

import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import { login } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";

const Landing = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [reigisterModal, setRegisterModal] = useState(false);

  const [isUser, setIsUser] = useState<boolean>(false);

  const handleClose = () => {
    setShowModal((prev) => !prev);
  };
  const showSignupModal = () => {
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
      {!user && (
        <button
          onClick={() => {
            setIsUser(true);
            setShowModal((prev) => !prev);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          로그인
        </button>
      )}
      {showModal && (
        <LoginModal
          handleClose={handleClose}
          showSignupModal={showSignupModal}
        />
      )}

      {reigisterModal && <RegisterModal handleSignUpOpen={showSignupModal} />}
    </div>
  );
};

export default Landing;
