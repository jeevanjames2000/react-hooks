import React, { useState } from "react";
const data = [
  { id: 1, col1: "hii", col2: "hello", col3: "hey" },
  { id: 2, col1: "greetings", col2: "salutations", col3: "howdy" },
  { id: 3, col1: "hola", col2: "bonjour", col3: "ciao" },
  { id: 4, col1: "namaste", col2: "vanakkam", col3: "salaam" },
  { id: 5, col1: "hello", col2: "hi", col3: "hey" },
  { id: 6, col1: "what's up", col2: "yo", col3: "sup" },
  { id: 7, col1: "good morning", col2: "good afternoon", col3: "good evening" },
  { id: 8, col1: "aloha", col2: "howzit", col3: "cheers" },
  { id: 9, col1: "hey there", col2: "hiya", col3: "hello" },
  { id: 10, col1: "g'day", col2: "mate", col3: "how's it going" },
];

const SearchableTable = () => {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const handleTextSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    const filtered = data.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(value)
      )
    );
    setFilteredData(filtered);
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setQuery(transcript);
      const filtered = data.filter((item) =>
        Object.values(item).some((val) =>
          val.toString().toLowerCase().includes(transcript)
        )
      );
      setFilteredData(filtered);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Voice Search</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search here..."
          value={query}
          onChange={handleTextSearch}
          style={{ padding: "10px", width: "300px", borderRadius: "5px" }}
        />

        <button
          onClick={handleVoiceSearch}
          style={{
            padding: "10px",
            backgroundColor: isListening ? "#f44336" : "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          disabled={isListening}
        >
          {isListening ? "Listening..." : "Voice Search"}
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          marginTop: "20px",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Col1</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Col2</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Col3</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {item.id}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {item.col1}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {item.col2}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {item.col3}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{
                  padding: "10px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SearchableTable;
