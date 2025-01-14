import { useSelector } from "react-redux";
import { useSocketContext } from "../../context/SocketContext";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setSelectedConversation } from "../../redux/slices/conversationSlice";
import { useAuthContext } from "../../context/AuthContext";

const Conversation = ({ conversation, lastIdx, emoji }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedConversation } = useSelector(
    (state: RootState) => state.conversation
  );
  const { authUser } = useAuthContext();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
        onClick={() => dispatch(setSelectedConversation(conversation))}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">
              {authUser.username !== conversation.username
                ? conversation.username
                : conversation.username + " ( Me😀)"}
            </p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
