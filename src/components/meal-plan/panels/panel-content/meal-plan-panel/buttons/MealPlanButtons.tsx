import "./MealPlanButtons.css";
import { MealPlanButtonProps } from "./MealPlanButtons.props";

export default function MealPlanButtons(props: MealPlanButtonProps) {
  return (
    <>
      <button
        className="btn btn-submit"
        onClick={() =>
          props.triggerModal("add-meal", { height: "75%", width: "50%" })
        }
      >
        + Add Meal
      </button>
      {!props.isActive && (
        <button className="btn btn-info" onClick={props.handleMakeActive}>
          Set as active
        </button>
      )}
      <button
        className="btn btn-warning"
        onClick={() =>
          props.triggerModal("rename", { height: "50%", width: "50%" })
        }
      >
        Rename
      </button>
      <button className="btn btn-delete" onClick={props.handleDelete}>
        Delete
      </button>
    </>
  );
}
