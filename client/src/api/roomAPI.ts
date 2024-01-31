// import { Socket } from "socket.io";
// import { io } from "socket.io-client";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

// const socket = io("http://localhost:3000");
// 방을 생성하는 함수
const createRoom = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  title: string
) => {
  socket.emit("createRoom", title);
};

const getRooms = (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
  socket.on("updateRoomList", (rooms: string[]) => {
    console.log(rooms);
  });
};

export { createRoom, getRooms };
