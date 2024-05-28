import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import "./App.css";
import Home from "./pages/home/Home";
import NotFound from "./pages/404/NotFound";
import { useAppSelector } from "./redux/hooks";
import type { RootState } from "./redux/store";

//TO DO: add in support for saving auth token to local storage and have app check for it before directing user to login or signup.
function App() {
  const user = useAppSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {user.username && (
          <>
            <Route path="/" element={<Home />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
