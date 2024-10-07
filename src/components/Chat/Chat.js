import React, { useState } from "react";
import ChatBody from "./Chatbody";
import ChatHeader from "./Chatheader";
import ChatFooter from "./ChatFooter";
import { Box } from "@mui/material";

const Chat = () => {
  const [text, setText] = useState("Hello, World!");

  const handlePrint = async () => {
    try {
      const response = await fetch("https://sports1.gitam.edu/print", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.text();
      console.log(result);
      alert("Print successful: " + result);
    } catch (error) {
      console.error("Error printing:", error);
      alert("Print failed: " + error.message);
    }
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
