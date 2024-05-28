import SignupImage from "../../assets/signupimage.png";
import SplitPanel from "../../components/ui/split-panel/SplitPanel";
import useForm from "../../hooks/useForm";
import {
  Section,
  FormData,
} from "../../components/form/flexible-form/FlexibleForm.utils";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import Api from "../../PlanPlateApi";
import { setUser } from "../../redux/userReducer";
import FlexibleForm from "../../components/form/flexible-form/FlexibleForm";
import {
  IMAGE_ALT,
  HEADING1,
  HEADING2,
  SUBHEADING,
  initialFormData,
  initialSection,
  mergeData,
  signupFormData,
} from "./Signup.constants";

export default function Signup() {
  const [formData, setFormData, isValid, setErrors] = useForm(initialFormData);
  const [section, setSection] = useState<Section>(initialSection);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sections: (keyof FormData)[] = ["personal", "physical", "credentials"];

  //check form for errors
  useEffect(() => {
    if (section !== "credentials") return;
    const valuesNotEqual =
      formData.credentials.password.value !==
      formData.credentials.confirmPassword.value;
    const errorsNotSet =
      formData.credentials.password.error === "" ||
      formData.credentials.confirmPassword.error === "";
    if (valuesNotEqual && errorsNotSet) {
      setErrors(
        ["password", "confirmPassword"],
        section,
        "Passwords do not match"
      );
    } else if (!valuesNotEqual && !errorsNotSet) {
      setErrors(["password", "confirmPassword"], section, "");
    }
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(e, section);
  }

  function incrementSection() {
    const currentIndex = sections.indexOf(section as keyof FormData);
    if (currentIndex < sections.length - 1) {
      setSection(sections[currentIndex + 1]);
    }
  }

  function decrementSection() {
    const currentIndex = sections.indexOf(section as keyof FormData);
    if (currentIndex > 0) {
      setSection(sections[currentIndex - 1]);
    }
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const result = await Api.signUp(mergeData(formData) as signupFormData);
    if (result.status === 200) {
      dispatch(setUser(result.data));
      navigate("/");
    } else {
      alert("Username is already taken");
    }
  }

  return (
    <SplitPanel
      image={SignupImage}
      imageAlt={IMAGE_ALT}
      heading1={HEADING1}
      heading2={HEADING2}
      subHeading={SUBHEADING}
    >
      <FlexibleForm
        formData={formData[section]}
        canProceed={isValid(section)}
        handleChange={handleChange}
        primaryOnClick={
          section === "credentials" ? handleSubmit : incrementSection
        }
        primaryText={section === "credentials" ? "Finish" : "Next"}
        showSecondary={true}
        secondaryOnClick={decrementSection}
        secondaryDisabled={section === "personal"}
        linkHref="/login"
        linkText="Already have an account?"
      />
    </SplitPanel>
  );
}
