import FlexibleInput from "../../../../form/flexible-input/FlexibleInput";
import "./AddModalContent.css";
import React, { useState } from "react";
import Api from "../../../../../PlanPlateApi";

export default function AddModalContent(props: { closeModal: () => void }) {
  const [name, setName] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  async function createMealPlan() {
    const result = await Api.createMealPlan({ name, active: false });
    if (result.status === 200) {
      props.closeModal();
      return;
    }
    alert(result.data.message);
  }

  return (
    <>
      <div className="modal-header">
        <h2>Create New Meal Plan</h2>
        <button onClick={props.closeModal} className="close-modal-btn">
          X
        </button>
      </div>
      <div className="input-container">
        <FlexibleInput
          handleChange={handleChange}
          value={name}
          labelText="Meal Plan Name:"
          name="meal-plan-name"
        />
      </div>
      <button
        disabled={name === ""}
        onClick={createMealPlan}
        className="btn-primary"
      >
        Create
      </button>
    </>
  );
}
