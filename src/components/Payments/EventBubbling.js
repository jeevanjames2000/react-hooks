import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
export default function EventBubbling() {
  const [state, setState] = useState({
    childColor: "red",
    parentColor: "green",
    innerChild: "yellow",
  });

  return (
    <>
      <div
        style={{
          backgroundColor: state.parentColor,
          height: "10rem",
          width: "10rem",
          display: "flex",
          justifyContent: "center",
          margin: "auto",
        }}
        onClick={() => {
          console.log("parent clicked");
          setState((prev) => ({
            ...prev,
            childColor: prev.parentColor,
            parentColor: prev.childColor,
          }));
        }}
      >
        <div
          style={{
            backgroundColor: state.childColor,
            height: "5rem",
            width: "5rem",
            margin: "auto",
            display: "flex", // Use flexbox for the child
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={(e) => {
            e.stopPropagation();
            console.log("child clicked");
            setState((prev) => ({
              ...prev,
              parentColor: prev.childColor,
              childColor: prev.parentColor,
            }));
          }}
        >
          <div
            style={{
              backgroundColor: state.innerChild,
              height: "2rem",
              width: "2rem",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              // margin: "auto",
            }}
            onClick={(e) => {
              e.stopPropagation();
              console.log("inner child clicked");
              setState((prev) => ({
                ...prev,
                parentColor: prev.parentColor,
                childColor: prev.innerChild,
                innerChild: prev.childColor,
              }));
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
