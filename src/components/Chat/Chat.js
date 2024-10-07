import React, { useState } from "react";
import ChatBody from "./Chatbody";
import ChatHeader from "./Chatheader";
import ChatFooter from "./ChatFooter";
import { Box } from "@mui/material";

const Chat = () => {
  const [text, setText] = useState("Hello, World!");

  const handlePrint = async () => {
    window.print();
  };
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
      {/* <ChatHeader />
      <ChatBody />
      <ChatFooter /> */}
      <div style={{ padding: "20px" }}>
        <h1>Print Receipt</h1>

        <button onClick={handlePrint}>Print</button>
      </div>
    </Box>
  );
};

export default Chat;
