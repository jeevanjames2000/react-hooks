import { Box, Button, Typography } from "@mui/material";
import React from "react";

export default function RazorPay() {
  return (
    <>
      <Box
        sx={{
          border: "1px solid black",
          height: "100%",
          width: "15rem",
          padding: "2rem",
        }}
      >
        <Typography color="blue">RazorPay Payments Testing</Typography>
        <Typography color="green">$500</Typography>

        <Button variant="contained">Proceed to pay</Button>
      </Box>
    </>
  );
}
