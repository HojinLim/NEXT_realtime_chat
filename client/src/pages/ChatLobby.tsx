import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../../typings";
import { socket } from "../App";

const ChatLobby = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  socket.on("connect", () => {
    console.log(socket.id); // 소켓 아이디

    // socket.emit("clientMsg", "si");
    socket.on("serverMsg", (msg: string) => {
      console.log(msg);
      setChat((oldChat) => [...oldChat, msg]);
    });
  });

  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });
  // useEffect(() => {
  //   socketRef.current = io("http://localhost:5000");

  //   socketRef.current.on("serverMsg", (msg: string) => {
  //     setChat((oldChat) => [...oldChat, msg]);
  //   });

  //   return () => {
  //     socketRef.current?.disconnect();
  //   };
  // }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("clientMsg", message);
    setMessage("");
  };

  return (
    <>
      {/* <SendMessageForm /> */}
      <ul id="messages">
        {chat.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          autoComplete="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>
      {/* <div className="flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            console.log("Entering Room A");
            navi("/room/a");
          }}
        >
          Room A
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => console.log("Entering Room B")}
        >
          Room B
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => console.log("Entering Room C")}
        >
          Room C
        </button>
      </div> */}
    </>
  );
};

export default ChatLobby;
