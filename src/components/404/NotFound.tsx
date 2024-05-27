import NotFoundImage from "../../assets/notfound.png";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="centered">
      <div className="login-container">
        <img
          src={NotFoundImage}
          alt="healthy food on plate"
          className="login-image"
        ></img>
        <div className="form-container">
          <div className="heading-container">
            <h1 className="login-heading">
              404<br></br>not found.
            </h1>
            <Link to={"/"}>Lets get back to charted territory.</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
