import "./Login.css";
import LoginForm from "./LoginForm";
import LoginImage from "../../../assets/loginimage.png";

export default function Login() {
  return (
    <div className="centered">
      <div className="login-container">
        <img
          src={LoginImage}
          alt="healthy food on plate"
          className="login-image"
        ></img>
        <div className="form-container">
          <div className="heading-container">
            <h1 className="login-heading">
              Diet planning<br></br>made easy.
            </h1>
          </div>
          <h2>Plan-Plate Login:</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
