import "./Signup.css";
import SignupImage from "../../../assets/signupimage.png";
import SignupForm from "./SignupForm";

export default function Signup() {
  return (
    <div className="centered">
      <div className="login-container">
        <img
          src={SignupImage}
          alt="healthy food on plate"
          className="login-image"
        ></img>
        <div className="form-container">
          <div className="heading-container">
            <h1 className="login-heading">
              Welcome<br></br>Lets get started.
            </h1>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
