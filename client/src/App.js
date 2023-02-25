import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// importing pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
//git comment
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
