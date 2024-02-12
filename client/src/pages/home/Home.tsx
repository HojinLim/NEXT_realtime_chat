import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
      <a href="https://www.flaticon.com/kr/free-icons/" title="말풍선 아이콘">
        말풍선 아이콘 제작자: Smashicons - Flaticon
      </a>
    </div>
  );
};
export default Home;
