import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import ChatLobby from "./pages/ChatLobby";
import MyPage from "./pages/MyPage";
import Chat from "./components/Chat";
import { ClientToServerEvents, ServerToClientEvents } from "../../typings";
import { io, Socket } from "socket.io-client";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:5000"
);
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/room" element={<ChatLobby />} />
          <Route path="/room/:id" element={<Chat />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
