import { resetUser } from "../../redux/userReducer";
import { useAppDispatch } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import Api from "../../PlanPlateApi";

export default function Logout() {
  const dispatch = useAppDispatch();
  dispatch(resetUser());
  localStorage.removeItem("plan-plate-token");
  Api.token = "";
  return <Navigate to={"/login"} />;
}
