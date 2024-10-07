import {
  IconButton,
  InputAdornment,
  TextField,
  Box,
  Grid2,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { addSentMessage } from "../../utils/Chatslice";
import { io } from "socket.io-client";
const ChatFooter = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:2021");
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);
  const handleSend = () => {
    if (inputValue.trim()) {
      const message = {
        text: inputValue,
        sender: socket.id,
      };
      if (socket.id === message.sender) {
        dispatch(addSentMessage(inputValue));
      }
      socket.emit("sendMessage", message);
      setInputValue("");
    }
  };
  return (
    <Box
      sx={{
        borderTop: "1px solid #DDD",
        backgroundColor: "#f5f5f5",
        padding: "0.5rem",
      }}
    >
      <Grid2 container>
        <Grid2 item size={{ xs: 12 }}>
          <TextField
            fullWidth
            placeholder="Type your message..."
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="send message" onClick={handleSend}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};
export default ChatFooter;
