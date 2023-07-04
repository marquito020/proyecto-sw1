import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../models/chat.model";

const EmptyMessagesState: Message[] = [];

const messagesSlice = createSlice({
  name: "messages",
  initialState: EmptyMessagesState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.push(action.payload);
    },
    resetMessage: (state) => {
      return EmptyMessagesState;
    },
  },
});

export const { addMessage, resetMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
