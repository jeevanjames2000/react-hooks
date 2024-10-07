import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reacthooks from "./components/Reacthooks";
import Chat from "./components/Chat/Chat";
import Print from "./components/Print/Print";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/Reacthooks" element={<Reacthooks />} />
          <Route path="/Print" element={<Print />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
