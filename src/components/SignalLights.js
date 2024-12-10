import { useEffect, useState } from "react";
export default function TrafficLight() {
  const [on, setOn] = useState("red");
  useEffect(() => {
    const sequence = ["red", "green", "yellow"];
    let index = sequence.indexOf(on);

    const interval = setInterval(() => {
      index = (index + 1) % sequence.length;
      setOn(sequence[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, [on]);

  return (
    <>
      <div
        style={{
          //   backgroundColor: "#ddd",
          width: "5rem",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          gap: 5,
        }}
      >
        <div
          style={{
            height: "2rem",
            width: "2rem",
            borderRadius: "50%",
            backgroundColor: on === "red" ? "red" : "#ddd",
          }}
        ></div>

        <div
          style={{
            height: "2rem",
            width: "2rem",
            borderRadius: "50%",
            backgroundColor: on === "yellow" ? "yellow" : "#ddd",
          }}
        ></div>
        <div
          style={{
            height: "2rem",
            width: "2rem",
            borderRadius: "50%",
            backgroundColor: on === "green" ? "green" : "#ddd",
          }}
        ></div>
      </div>
    </>
  );
}
