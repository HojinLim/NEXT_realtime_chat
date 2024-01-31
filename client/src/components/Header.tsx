import React from "react";
// import SendMessageForm from "./SendMessageForm";
import { useSelector } from "react-redux";
import { UserState } from "../redux/slices/userSlice";

type Props = {};

const Header = (props: Props) => {
  const user = useSelector((state: UserState) => state);
  return (
    <div className="bg-blue-500 p-4" id="hi">
      {user.name && <div>{`Hi! ${user.name}`}</div>}
      <h1 className="text-white text-center">Header</h1>
    </div>
  );
};

export default Header;
