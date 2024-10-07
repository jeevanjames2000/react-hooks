import React, { useState } from "react";
import ChatBody from "./Chatbody";
import ChatHeader from "./Chatheader";
import ChatFooter from "./ChatFooter";
import { Box } from "@mui/material";

const Chat = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "space-between",
        borderRadius: "10px",
      }}
    >
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </Box>
  );
};

export default Chat;
