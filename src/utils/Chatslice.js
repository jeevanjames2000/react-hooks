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
      state.sentMessages.push(action.payload);
    },
    addReceivedMessage: (state, action) => {
      state.receivedMessages.push(action.payload);
    },
  },
});
export const { addSentMessage, addReceivedMessage } = chatSlice.actions;
export default chatSlice.reducer;
