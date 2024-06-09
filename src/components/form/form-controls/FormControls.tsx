import { FormControlProps } from "./FormControlProps";
import "./FormControls.css";

export default function FormControls(props: FormControlProps) {
  return (
    <div className="signup-form-btn-container">
      {props.showSecondary && (
        <button
          className="btn btn-normal"
          onClick={props.secondaryOnClick}
          disabled={props.secondaryDisabled}
        >
          Back
        </button>
      )}
      <button
        className="btn btn-submit"
        onClick={props.primaryOnClick}
        disabled={props.primaryDisabled}
      >
        {props.primaryText}
      </button>
    </div>
  );
}
