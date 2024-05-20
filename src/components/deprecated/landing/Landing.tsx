import { ReactElement } from "react";
import "./Landing.css";
import logo from "../../../assets/planplatelogo.png";

export default function Landing(): ReactElement {
  return (
    <div className="centered">
      <img src={logo} alt="Plan Plate logo" />
      <div className="button-container">
        <a href="login" className="landing-button">
          <button className="btn-primary">Sign On</button>
        </a>
        <a href="signup" className="landing-button">
          <button>Create Account</button>
        </a>
      </div>
    </div>
  );
}
