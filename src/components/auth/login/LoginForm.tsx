import "nice-forms.css";
import "./LoginForm.css";
import React, { useState } from "react";
import Api from "../../../PlanPlateApi";
import FlexibleInput from "../../ui/FlexibleInput";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/userReducer";
import FormControls from "../form-controls/FormControls";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    general: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!formData.password || !formData.username) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        username: formData.username ? "" : "This field is required.",
        password: formData.password ? "" : "This field is required.",
      }));
      return;
    }
    const result = await Api.login(formData);
    if (result.status === 200) {
      //navigate to homescreen if login is successful
      dispatch(setUser(result.data));
      navigate("/");
    } else {
      // set form error message. server returns 400 status for bad credentials
      const message =
        result.status === 400
          ? "Invalid username or password"
          : "Error connecting to server";
      setFormErrors((formErrors) => ({
        ...formErrors,
        general: message,
      }));
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((formData) => {
      return {
        ...formData,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {" "}
      {formErrors.general && <p className="form-error">{formErrors.general}</p>}
      <FlexibleInput
        handleChange={handleChange}
        name="username"
        errorMessage={formErrors.username}
        labelText="Username:"
        value={formData.username}
      />
      <FlexibleInput
        handleChange={handleChange}
        name="password"
        errorMessage={formErrors.password}
        labelText="Password:"
        value={formData.password}
        type="password"
      />
      <FormControls
        showSecondary={false}
        primaryOnClick={handleSubmit}
        primaryDisabled={false}
        primaryText="Login"
      />
      <Link to={"/signup"}>Don't have an account?</Link>
    </form>
  );
}
