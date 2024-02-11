import { configureStore } from '@reduxjs/toolkit';
import conversationSlice from './slices/conversationSlice';

// 스토어 생성
const store = configureStore({
    reducer: {
        conversation: conversationSlice,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;