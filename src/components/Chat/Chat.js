import React, { useState, useEffect } from "react";
import ChatBody from "./Chatbody";
import ChatHeader from "./Chatheader";
import ChatFooter from "./ChatFooter";
import { Box } from "@mui/material";
import { io } from "socket.io-client";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  console.log("socket: ", socket);

  useEffect(() => {
    const newSocket = io("http://localhost:2021");
    console.log("newSocket: ", newSocket);
    setSocket(newSocket);
  }, []);
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
      <ChatBody socket={socket} />
      <ChatFooter socket={socket} />
    </Box>
  );
};

export default Chat;
