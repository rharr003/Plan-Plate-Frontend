import LoginImage from "../../assets/loginimage.png";
import SplitPanel from "../../components/ui/split-panel/SplitPanel";
import {
  IMAGE_ALT,
  HEADING1,
  HEADING2,
  SUBHEADING,
  initialFormData,
  initialSection,
  LoginFormData,
} from "./Login.constants";
import FlexibleForm from "../../components/form/flexible-form/FlexibleForm";
import useForm from "../../hooks/useForm";
import React, { useState } from "react";
import {
  Section,
  mergeData,
} from "../../components/form/flexible-form/FlexibleForm.utils";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/userReducer";
import Api from "../../PlanPlateApi";

export default function Login() {
  const [formData, setFormData, isValid, setError] = useForm(initialFormData);
  const [section, setSection] = useState<Section>(initialSection);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(e, section);
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const result = await Api.login(mergeData(formData) as LoginFormData);
    if (result.status === 200) {
      //navigate to homescreen if login is successful
      dispatch(setUser(result.data));
      navigate("/");
    } else {
      // set form error message. server returns 400 status for bad credentials
      if (result.status === 400) {
        setError(
          ["username"],
          section as string,
          "Invalid username and/or password"
        );
      } else {
        alert("There was an issue connecting to our servers");
      }
    }
  }

  return (
    <SplitPanel
      image={LoginImage}
      imageAlt={IMAGE_ALT}
      heading1={HEADING1}
      heading2={HEADING2}
      subHeading={SUBHEADING}
    >
      <FlexibleForm
        formData={formData[section]}
        canProceed={isValid(section)}
        handleChange={handleChange}
        primaryOnClick={handleSubmit}
        primaryText="Login"
        showSecondary={false}
        linkHref="/signup"
        linkText="Dont have an account?"
      />
    </SplitPanel>
  );
}
