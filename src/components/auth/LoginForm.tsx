import "nice-forms.css";
import "./LoginForm.css";
import React, { useState } from "react";
import Api from "../../PlanPlateApi";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    general: "",
  });

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
      <div className="nice-form-group">
        <label htmlFor="username">Username:</label>
        <small>{formErrors.username}</small>
        <input
          type="text"
          name="username"
          //aria label is set to we can find the input element during testing
          aria-label="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="nice-form-group">
        <label htmlFor="password">Password:</label>
        <small>{formErrors.password}</small>
        <input
          type="text"
          name="password"
          aria-label="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="login-form-btn-container">
        <button type="submit" className="btn-primary">
          Login
        </button>
        <a href="/signup">Create an account</a>
      </div>
      {formErrors.general && <p className="form-error">{formErrors.general}</p>}
    </form>
  );
}
