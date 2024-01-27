import React, { useState } from "react";
import socketIOClient from "socket.io-client";

const URL = "http://localhost:3000";
const socket = socketIOClient(URL);

const SendMessageForm: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    socket.emit("chat message", message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r"
      >
        Send
      </button>
    </form>
  );
};

export default SendMessageForm;
