import React, { useState, useEffect } from "react";
import FlexibleInput from "../../ui/FlexibleInput";
import "./SignupForm.css";
import Api from "../../../PlanPlateApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/userReducer";
import {
  SignUpStage,
  initialFormData,
  initialSignUpStage,
  FormData,
  mergeData,
} from "./signUpFormUtil";
import FormControls from "../form-controls/FormControls";

export default function SignupForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [signUpStage, setSignupStage] =
    useState<SignUpStage>(initialSignUpStage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sections: (keyof FormData)[] = ["personal", "physical", "credentials"];
  const canProceed = Object.values(formData[signUpStage]).every(
    (val) => val.value !== "" && val.error === ""
  );

  //check to see if password match and set error appropriately. This feels hacky should probably rethink how formdata validation should be processed here.
  useEffect(() => {
    const { password, confirmPassword } = formData.credentials;
    let errorMessage = "";
    if (password.value !== confirmPassword.value) {
      errorMessage = "Passwords do not match";
    }
    if (
      (password.value !== confirmPassword.value && password.error === "") ||
      (password.value === confirmPassword.value && password.error)
    ) {
      setFormData((formData) => ({
        ...formData,
        credentials: {
          ...formData.credentials,
          password: {
            ...formData.credentials.password,
            error: errorMessage,
          },
          confirmPassword: {
            ...formData.credentials.confirmPassword,
            error: errorMessage,
          },
        },
      }));
    }
  }, [formData.credentials.password, formData.credentials.confirmPassword]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [signUpStage]: {
        ...formData[signUpStage],
        [name]: {
          ...formData[signUpStage][name],
          value,
        },
      },
    }));
  }

  function incrementSignUpStage() {
    const currentIndex = sections.indexOf(signUpStage as keyof FormData);
    if (currentIndex < sections.length - 1) {
      setSignupStage(sections[currentIndex + 1]);
    }
  }

  function decrementSignUpStage() {
    const currentIndex = sections.indexOf(signUpStage as keyof FormData);
    if (currentIndex > 0) {
      setSignupStage(sections[currentIndex - 1]);
    }
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const result = await Api.signUp(mergeData(formData));
    if (result.status === 200) {
      dispatch(setUser(result.data));
      navigate("/");
    } else {
      alert("Username is already taken");
    }
  }

  return (
    <div className="signup-form">
      {Object.keys(formData[signUpStage]).map((key) => {
        const { value, type, error, label } = formData[signUpStage][key];
        return (
          <FlexibleInput
            value={value}
            type={type}
            handleChange={handleChange}
            errorMessage={error}
            labelText={label}
            name={key}
            key={key}
          />
        );
      })}
      <FormControls
        showSecondary={true}
        secondaryOnClick={decrementSignUpStage}
        secondaryDisabled={signUpStage === "personal"}
        primaryOnClick={
          signUpStage === "credentials" ? handleSubmit : incrementSignUpStage
        }
        primaryDisabled={!canProceed}
        primaryText={signUpStage === "credentials" ? "Finish" : "Next"}
      />
      <Link to="/login">Already have an account?</Link>
    </div>
  );
}
