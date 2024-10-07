import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sentMessages: [],
  receivedMessages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addSentMessage: (state, action) => {
      state.sentMessages.push({
        text: action.payload,
        sender: action.payload.sender,
      });
    },
    addReceivedMessage: (state, action) => {
      state.receivedMessages.push({
        text: action.payload,
        sender: action.payload.sender,
      });
    },
  },
});

export const { addSentMessage, addReceivedMessage } = chatSlice.actions;
export default chatSlice.reducer;
