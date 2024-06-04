import "./WelcomePanel.css";
import React, { useState } from "react";
import FlexibleForm from "../../form/flexible-form/FlexibleForm";
import useForm from "../../../hooks/useForm";

export default function WelcomePanel() {
  function handleSubmit() {}
  return (
    <div className="welcome-panel">
      <h1>Welcome to Plan-Plate</h1>
      <p>
        It looks like you don't have any meal plans yet. To get started click on
        the "+ Add New" plan tab to create your first meal plan!
      </p>
    </div>
  );
}
