import "nice-forms.css";
import "./FlexibleInput.css";
import { FlexibleInputProps } from "./FlexibleInputProps";

export default function FlexibleInput(props: FlexibleInputProps) {
  return (
    <div className="nice-form-group">
      <label htmlFor={props.name}>{props.labelText}</label>
      <small>{props.errorMessage}</small>
      <input
        type={props.type || "text"}
        placeholder={props.placeholder}
        name={props.name}
        //aria label is set to we can find the input element during testing
        aria-label={props.name}
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  );
}
