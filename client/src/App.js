import "./App.css";

// importing pages
// import Home from "./pages/Home";
import Register from "./Register";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";

//git comment
function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/log" element={<Dashboard />} />
      <Route element={<RequireAuth />}>
        <Route path="/log" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
