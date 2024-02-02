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
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
  const user = useSelector<RootState>((state) => state.auth.user);
  const token = localStorage.getItem("token");

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/room" element={<ChatLobby />} />
          <Route path="/room/:id" element={<ChatLobby />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
