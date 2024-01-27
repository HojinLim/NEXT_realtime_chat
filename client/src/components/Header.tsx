import React from "react";
import SendMessageForm from "./SendMessageForm";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="bg-blue-500 p-4">
      <h1 className="text-white text-center">Header</h1>
      <SendMessageForm />
    </div>
  );
};

export default Header;
