import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/deprecated/landing/Landing";
import Login from "./components/auth/Login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
