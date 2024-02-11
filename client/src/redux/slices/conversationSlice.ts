import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConversationState {
    selectedConversation: any;
    messages: any[];
}

const initialState: ConversationState = {
    selectedConversation: null,
    messages: [],
};

const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        setSelectedConversation: (state, action: PayloadAction<any>) => {
            state.selectedConversation = action.payload;
        },
        setMessages: (state, action: PayloadAction<any[]>) => {
            state.messages = action.payload;
        },
    },
});

export const { setSelectedConversation, setMessages } = conversationSlice.actions;

export default conversationSlice.reducer;