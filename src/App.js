import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reacthooks from "./components/Reacthooks";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/Reacthooks" element={<Reacthooks />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
