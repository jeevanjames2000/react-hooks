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
          height: "2rem",
          width: "2rem",
          borderRadius: "50%",
          backgroundColor: on === "green" ? "green" : "",
        }}
      ></div>

      <div
        style={{
          height: "2rem",
          width: "2rem",
          borderRadius: "50%",
          backgroundColor: on === "yellow" ? "yellow" : "",
        }}
      ></div>
      <div
        style={{
          height: "2rem",
          width: "2rem",
          borderRadius: "50%",
          backgroundColor: on === "red" ? "red" : "",
        }}
      ></div>
    </>
  );
}
