import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import ChatLobby from "./pages/ChatLobby";
import MyPage from "./pages/MyPage";
import Chat from "./components/Chat";
import { ClientToServerEvents, ServerToClientEvents } from "../../typings";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:5000"
);

function App() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/room" element={<ChatLobby />} />
          <Route path="/room/:id" element={<Chat />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />

          <Route
            path="/mypage"
            element={user ? <MyPage /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <RegisterPage />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
