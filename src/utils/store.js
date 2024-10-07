import { configureStore } from "@reduxjs/toolkit";
import Chatslice from "./Chatslice";

const store = configureStore({
  reducer: {
    chat: Chatslice,
  },
});

export default store;
