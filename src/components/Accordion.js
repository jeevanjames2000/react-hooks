import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
export default function Accordion(props) {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  return (
    <>
      <div
        style={{
          width: "auto",
          backgroundColor: "lightblue",
          border: "2px solid black",
          borderRadius: "1rem",
          transition: "border 0.3s ease-in-out",
          padding: "0.5rem",
          margin: 5,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          <h3 style={{ margin: 10 }}>{props.title}</h3>
          <div>{open ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}</div>
        </div>
        <div
          style={{
            maxHeight: open ? "200px" : "0",
            transition: "max-height 0.5s ease-in-out",
            overflow: "hidden",
            backgroundColor: "lightblue",
            padding: open ? "1rem" : "0",
            borderTop: open ? "2px solid black" : "none",
          }}
        >
          <div>{props.content}</div>
        </div>
      </div>
    </>
  );
}
