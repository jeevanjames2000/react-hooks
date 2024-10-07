import React, { useState } from "react";

const Print = () => {
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
    <div style={{ padding: "20px" }}>
      <h1>Print Receipt</h1>

      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default Print;
