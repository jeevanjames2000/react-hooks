import {
  IconButton,
  InputAdornment,
  TextField,
  Box,
  Grid2,
} from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { addSentMessage } from "../../utils/Chatslice";

const ChatFooter = ({ socket }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim() && socket) {
      // Check if socket is initialized
      const message = {
        text: inputValue,
        sender: socket.id,
      };
      if (socket.id === message.sender) {
        dispatch(addSentMessage(inputValue));
      }
      socket.emit("chat message", message);
      setInputValue("");
    } else {
      console.error("Socket is not connected or message is empty");
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
