import React from "react";
import SendMessageForm from "./SendMessageForm";

type Props = {};

const Chat = (props: Props) => {
  return (
    <div className="fixed flex flex-col h-screen">
      <div className="flex-grow bg-gray-200 p-4">
        <div className="flex justify-end mb-2">
          <div className="bg-blue-500 text-white rounded-lg p-2">Hello!</div>
        </div>
        <div className="flex justify-start mb-2">
          <div className="bg-gray-300 rounded-lg p-2">Hi there!</div>
        </div>
      </div>
      <SendMessageForm />
    </div>
  );
};

export default Chat;
