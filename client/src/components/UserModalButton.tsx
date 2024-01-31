import { useState } from "react";

const UserModalButton = ({
  onClick,
  handleNameChange,
  handleClose,
  name,
  handleSignUp,
}: {
  onClick: () => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  handleSignUp: () => void;
  name: string;
}) => {
  const [password, setPassword] = useState("");
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="modal-btn">
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
        className="mt-3 p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="●●●●●●"
        className="mt-3 p-2 border border-gray-300 rounded"
      />

      <button
        className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-5/6"
        onClick={onClick}
      >
        로그인
      </button>

      <button
        className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClose}
      >
        Close
      </button>
      <div
        className="mt-3 hover:text-blue-700 hover:cursor-pointer text-gray-600 font-bold py-2 px-4"
        onClick={handleSignUp}
      >
        회원가입 바로가기
      </div>
    </div>
  );
};
export default UserModalButton;
