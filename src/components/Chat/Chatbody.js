import { Box, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReceivedMessage } from "../../utils/Chatslice";

const ChatBody = ({ socket }) => {
  console.log("socket: ", socket);
  const dispatch = useDispatch();
  const sentMessages = useSelector((state) => state.chat.sentMessages);
  const receivedMessages = useSelector((state) => state.chat.receivedMessages);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const currentSocketId = socket.id;

    socket.on("chat message", (message) => {
      if (message && message.text) {
        // Add received message to Redux store and update local state
        if (message.sender !== currentSocketId) {
          dispatch(addReceivedMessage(message));
        }
        setMessages((prev) => [
          ...prev,
          { text: message.text, sender: message.sender },
        ]);
      } else {
        console.error("Received message with undefined text: ", message);
      }
    });

    return () => {
      socket.off("chat message");
    };
  }, [socket, dispatch]);

  // Handle adding sent messages to the local message state
  useEffect(() => {
    if (sentMessages.length > 0) {
      const lastSentMessage = sentMessages[sentMessages.length - 1];
      if (lastSentMessage && lastSentMessage.text) {
        setMessages((prev) => [
          ...prev,
          { text: lastSentMessage.text, sender: socket.id },
        ]);
      }
    }
  }, [sentMessages, socket]);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        padding: "1rem",
        backgroundColor: "#fafafa",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {messages.map((message, index) => (
        <Grid2
          key={index}
          container
          justifyContent={
            message.sender === socket.id ? "flex-end" : "flex-start"
          }
          sx={{ marginBottom: "1rem" }}
        >
          <Box
            sx={{
              maxWidth: "60%",
              padding: "0.5rem 1rem",
              backgroundColor:
                message.sender === socket.id ? "#B7E0FF" : "#D2E0FB",
              borderRadius:
                message.sender === socket.id
                  ? "10px 10px 0 10px"
                  : "10px 10px 10px 0",
              wordWrap: "break-word",
            }}
          >
            <Typography>{message.text || "Message not available"}</Typography>
          </Box>
        </Grid2>
      ))}
    </Box>
  );
};

export default ChatBody;
