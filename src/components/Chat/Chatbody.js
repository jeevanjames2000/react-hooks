import { Box, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReceivedMessage } from "../../utils/Chatslice";
import { io } from "socket.io-client";

const ChatBody = () => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [currentSocketId, setCurrentSocketId] = useState(null);
  const sentMessages = useSelector((state) => state.chat.sentMessages);
  const receivedMessages = useSelector((state) => state.chat.receivedMessages);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:2021");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setCurrentSocketId(newSocket.id); // Store current user's socket ID
    });

    newSocket.on("receive_message", (message) => {
      if (message && message.text) {
        // Check if the message is from another user
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

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (sentMessages.length > 0) {
      const lastSentMessage = sentMessages[sentMessages.length - 1];
      if (lastSentMessage && lastSentMessage.text) {
        setMessages((prev) => [
          ...prev,
          { text: lastSentMessage.text, sender: currentSocketId },
        ]);
      }
    }
  }, []);

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
            message.sender === currentSocketId ? "flex-end" : "flex-start" // Sent messages on right, received on left
          }
          sx={{ marginBottom: "1rem" }}
        >
          <Box
            sx={{
              maxWidth: "60%",
              padding: "0.5rem 1rem",
              backgroundColor:
                message.sender === currentSocketId ? "#B7E0FF" : "#D2E0FB", // Different color for sent and received messages
              borderRadius:
                message.sender === currentSocketId
                  ? "10px 10px 0 10px" // Sent message styling
                  : "10px 10px 10px 0", // Received message styling
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
