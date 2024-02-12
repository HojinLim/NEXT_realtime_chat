import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";

import notificationSound from "../assets/sounds/notification.mp3";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/slices/conversationSlice";


const useListenMessages = () => {
    const { socket } = useSocketContext();
    const dispatch = useDispatch<AppDispatch>();
    const { messages } = useSelector((state: RootState) => state.conversation);

    useEffect(() => {
        socket?.on("newMessage", (newMessage: any) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            dispatch(setMessages([...messages, newMessage]))
        });

        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);
};
export default useListenMessages;
