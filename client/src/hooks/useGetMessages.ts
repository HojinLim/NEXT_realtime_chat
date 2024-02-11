import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/slices/conversationSlice";


const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, selectedConversation } = useSelector((state: RootState) => state.conversation);
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				dispatch(setMessages(data))
			} catch (error: any) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;
