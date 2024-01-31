import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// const URL = "http://localhost:3000";
// const socket = io(URL);

const SendMessageForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    //   socket.on("chat message", (message: string) => {
    //     setMessages((messages) => [...messages, message]);
    //   });
    //   // socket.io.on("ping", () => {
    //   //   console.log("ping");
    //   // });
    // }, []);
    // const handleSubmit = (event: React.FormEvent) => {
    //   event.preventDefault();
    //   socket.emit("chat message", message);
    //   setMessage("");
  });

  return (
    <div>
      {/* <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r"
        >
          Send
        </button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default SendMessageForm;
