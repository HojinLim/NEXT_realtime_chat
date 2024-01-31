import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import ChatLobby from "./pages/ChatLobby";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/room" element={<ChatLobby />} />
          <Route path="/room/:id" element={<ChatLobby />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
