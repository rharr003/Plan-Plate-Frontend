import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import "./App.css";
import Home from "./pages/home/Home";
import NotFound from "./pages/404/NotFound";
import { useAppSelector } from "./redux/hooks";
import useLocalAuth from "./hooks/useLocalAuth";
import { useEffect, useState } from "react";
import Api from "./PlanPlateApi";
import { useAppDispatch } from "./redux/hooks";
import { resetUser, setUser } from "./redux/userReducer";
import ProtectedRoutes from "./components/protected-route/ProtectedRoutes";
import MainNavigation from "./components/navbar/MainNavigation";
import Logout from "./pages/logout/Logout";
import { useNavigate } from "react-router-dom";

function App() {
  const user = useAppSelector((state) => state.user);
  const [token, setToken, deleteToken] = useLocalAuth();
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadSavedUser() {
      if (token) {
        Api.token = token as string;
        const { data: user } = await Api.fetchUser();
        dispatch(setUser(user));
        setLoading(false);
        navigate("/");
      }
    }

    loadSavedUser();
  }, []);

  function logout() {
    dispatch(resetUser());
    deleteToken();
    Api.token = "";
    navigate("/login");
  }

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      {user.username && <MainNavigation logout={logout} />}
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
