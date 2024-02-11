import { useState } from "react";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/slices/conversationSlice";


const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, selectedConversation } = useSelector((state: RootState) => state.conversation);
	const dispatch = useDispatch<AppDispatch>();
	const sendMessage = async (message: any) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);


			dispatch(setMessages([...messages, data]));
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;
