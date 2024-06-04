import "./MainNavigation.css";
import { useAppSelector } from "../../redux/hooks";
export default function MainNavigation(props: { logout: () => void }) {
  const username = useAppSelector((state) => state.user.username);
  return (
    <nav className="nav-bar">
      <h3 className="nav-brand">Plan-plate</h3>
      <div className="nav-item-container">
        <a className="nav-item" onClick={props.logout}>
          Logout ({username})
        </a>
      </div>
    </nav>
  );
}
