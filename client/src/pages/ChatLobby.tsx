// ERROR : 공사중.. ㅎㅎ
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import { ServerToClientEvents, ClientToServerEvents } from "../types/typings";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { UserState } from "../redux/slices/userSlice";
import Chat from "../components/Chat";

type Props = {};

const ChatLobby = (props: Props) => {
  // const [socket, setSocket] = useState<Socket<
  //   ServerToClientEvents,
  //   ClientToServerEvents
  // > | null>(null);
  // const navi = useNavigate();
  // const [room, setRoom] = useState<string>("");
  // const [rooms, setRooms] = useState<string[]>([]);
  // const user = useSelector((state: UserState) => state);

  // useEffect(() => {
  //   const newSocket = io("http://localhost:3000");
  //   setSocket(newSocket);

  //   return () => {
  //     newSocket.disconnect(); // Disconnect socket when component unmounts
  //   };
  // }, [room, rooms]);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("sendRoomLists", (data) => {
  //       setRooms(data.rooms);
  //     });

  //     socket.on("notifyEnterRoom", (data) => {
  //       console.log(`Entered room: ${data.room}`); // 참가한 방 이름 출력
  //     });
  //   }

  //   return () => {
  //     if (socket) {
  //       socket.off("sendRoomLists");
  //     }
  //   };
  // }, [socket]);

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();

  //   socket?.emit("createRoom", { room });
  //   socket?.on("error_roomExist", (data) => {
  //     toast.error(data.msg);
  //   });
  // };
  // //   방 입장 알림
  // const enterRoom = (room: string) => {
  //   socket?.emit("notifyEnterRoom", { name: user.name, room });
  //   navi(`/room/${room}`);
  // };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      {/* <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        만들기
      </button>
      <input
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        className="border border-gray-400 rounded px-2 py-1 mt-4"
        placeholder="Enter room name"
      />
      <h2 className="text-2xl font-bold mt-4">방 목록</h2>
      <div className="flex">
        {rooms?.map((room) => (
          <div
            onClick={() => enterRoom(room)}
            key={room}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            {room}
          </div>
        ))}
        <Chat />
      </div> */}
    </div>
  );
};

export default ChatLobby;
