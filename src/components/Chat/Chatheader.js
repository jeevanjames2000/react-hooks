import { Typography, Box } from "@mui/material";
import React from "react";

const ChatHeader = () => {
  return (
    <Box
      sx={{
        backgroundColor: "skyblue",
        padding: "0.5rem",
        borderBottom: "1px solid #DDD",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        G-Chat
      </Typography>
    </Box>
  );
};

export default ChatHeader;
