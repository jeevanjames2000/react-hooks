import React from "react";
import { Link } from "react-router-dom";

export default function Main() {
  const data = [
    { name: "Google SignIn", link: "googleSignIn" },
    { name: "Event Bubbling", link: "EventBubbling" },
    { name: "TanStack PreFetch", link: "preFetch" },
    { name: "Accordion", link: "Accordion" },
    { name: "Custom Table", link: "Table" },
    { name: "VoiceSearch", link: "voice" },
    { name: "ReactTransition", link: "ReactTransition" },
    { name: "ProgressiveImage", link: "ProgressiveImage" },
    { name: "Search AutoComplete", link: "autoComplete" },
    { name: "FileExplorer", link: "fileExplorer" },
    { name: "Virtualized List", link: "virtualList" },
    { name: "Traffic Lights", link: "trafficLights" },
    { name: "Digital Clock", link: "digitalClock" },
    { name: "Job Postings", link: "jobPostings" },
    { name: "reactQuery", link: "reactQuery" },
    { name: "PreFetch SWR", link: "preFetchSWR" },
  ];

  return (
    <div
      style={{
        padding: "2rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
      }}
    >
      {data.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            transition: "transform 0.2s ease",
          }}
        >
          <Link
            to={`/${item.link}`}
            style={{
              textDecoration: "none",
              color: "#007367",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
