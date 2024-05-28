import { FlexibleFormProps } from "./FlexibleFormProps";
import FlexibleInput from "../flexible-input/FlexibleInput";
import FormControls from "../form-controls/FormControls";
import { Link } from "react-router-dom";
import "./FlexibleForm.css";

export default function FlexibleForm(props: FlexibleFormProps) {
  return (
    <div className="signup-form">
      {Object.keys(props.formData).map((key) => {
        const { value, type, error, label } = props.formData[key];
        return (
          <FlexibleInput
            value={value}
            type={type}
            handleChange={props.handleChange}
            errorMessage={error}
            labelText={label}
            name={key}
            key={key}
          />
        );
      })}
      <FormControls
        showSecondary={props.showSecondary}
        secondaryOnClick={props.secondaryOnClick}
        secondaryDisabled={props.secondaryDisabled}
        primaryOnClick={props.primaryOnClick}
        primaryDisabled={!props.canProceed}
        primaryText={props.primaryText}
      />
      <Link to={props.linkHref}>{props.linkText}</Link>
    </div>
  );
}
