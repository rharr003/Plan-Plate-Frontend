import FlexibleInput from "../../../form/flexible-input/FlexibleInput";
import "./AddEditModalContent.css";
import React, { useState } from "react";
import Api from "../../../../PlanPlateApi";
import { useAppDispatch } from "../../../../redux/hooks";
import { addMealPlan, renameMealPlan } from "../../../../redux/mealPlanReducer";
import { AddEditModalContentProps } from "./AddEditModalContent.props";

export default function AddEditModalContent(props: AddEditModalContentProps) {
  const [name, setName] = useState(props.initialName || "");
  const dispatch = useAppDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  async function createMealPlan() {
    const result = await Api.createMealPlan({ name, active: false });
    if (result.status === 200) {
      dispatch(addMealPlan(result.data["meal-plan"]));
      props.closeModal();
      return;
    }
    alert(result.data.message);
  }

  async function editMealPlanName() {
    const payload = {
      name,
      meal_plan_id: props.mealPlanId as number,
    };
    const result = await Api.updateMealPlan(payload);
    if (result.status === 200) {
      dispatch(renameMealPlan(payload));
      props.closeModal();
    } else {
      alert(result.data.message);
    }
  }

  return (
    <div>
      <div className="modal-header">
        <h2>
          {props.isEditing ? "Change Meal Plan Name" : "Create New Meal Plan"}
        </h2>
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
        onClick={props.isEditing ? editMealPlanName : createMealPlan}
        className="btn-primary"
      >
        {props.isEditing ? "Save" : "Create"}
      </button>
    </div>
  );
}
