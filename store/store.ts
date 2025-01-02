import { configureStore } from "@reduxjs/toolkit";
import  chatSlice  from "./chatSlice";
import conversationSlice from "./ConversationSlice";

export const store = configureStore({
  reducer: {
    conversations:conversationSlice,
    chat:chatSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
