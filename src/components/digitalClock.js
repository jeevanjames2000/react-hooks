import { useState, useEffect } from "react";
export default function Clock() {
  const [time, setTime] = useState({
    hours: "--",
    minutes: "--",
    seconds: "--",
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime({
        hours: now.getHours().toString().padStart(2, "0"),
        minutes: now.getMinutes().toString().padStart(2, "0"),
        seconds: now.getSeconds().toString().padStart(2, "0"),
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div style={styles.container}>
      <DigitDisplay value={time.hours[0]} />
      <DigitDisplay value={time.hours[1]} />
      <Separator />
      <DigitDisplay value={time.minutes[0]} />
      <DigitDisplay value={time.minutes[1]} />
      <Separator />
      <DigitDisplay value={time.seconds[0]} />
      <DigitDisplay value={time.seconds[1]} />
    </div>
  );
}
function DigitDisplay({ value }) {
  return <div style={styles.digit}>{value}</div>;
}
function Separator() {
  return <div style={styles.separator}>:</div>;
}
const styles = {
  container: {
    display: "flex",
    backgroundColor: "black",
    color: "white",
    padding: "1rem",
    borderRadius: "8px",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
  },
  digit: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: "3rem",
    width: "2rem",
    height: "4rem",
    backgroundColor: "#111",
    border: "2px solid #444",
    borderRadius: "4px",
    boxShadow: "0 0 10px #0f00",
  },
  separator: {
    fontSize: "3rem",
    fontWeight: "bold",
    padding: "0 0.5rem",
  },
};
