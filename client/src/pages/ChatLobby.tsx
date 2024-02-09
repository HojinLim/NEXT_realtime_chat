import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  ServerToClientEvents,
  ClientToServerEvents,
  Message,
} from "../../../typings";
import { socket } from "../App";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";

const ChatLobby = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Message[]>([]);

  useEffect(() => {}, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("client side socket id: ", socket.id); // 소켓 아이디

      socket.on("serverMsg", (msg: Message) => {
        console.log(msg);

        setChat((oldChat) => [...oldChat, msg]);
      });
    });

    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
    });
  }, [socket, chat, message]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message === "") return;
    if (!user) return;
    socket.emit("clientMsg", { message, user: user?.name, room: null });
    setMessage("");
  };

  return (
    <>
      {/* <SendMessageForm /> */}
      <div className="flex-row flex gap-4">
        <div>state: </div>
        <div>{socket.connected ? "*connected*" : "disconnected"} </div>
      </div>
      <ul id="messages">
        {chat.map((msg, idx) => (
          <div key={idx} className="flex-row flex gap-4">
            <li>{msg.user}</li>
            <li>{msg.message}</li>
          </div>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          className="border-2 border-gray-300 p-2"
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
