import "./MealListItemHeader.css";
import { MealListItemHeaderProps } from "./MealListItemHeader.props";

export default function MealListItemHeader(props: MealListItemHeaderProps) {
  return (
    <div className="meal-header">
      <div className="meal-header-controls">
        <h3>{props.name}</h3>
        <div>
          <button className="btn btn-small btn-submit">Select</button>
          {/* <button
            className="btn btn-small btn-warning"
            onClick={props.triggerModal}
          >
            Edit
          </button> */}
          <button
            className="btn btn-small btn-delete"
            onClick={props.handleDeleteMeal}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="meal-stats">
        <p>Totals:</p>
        <p>{props.calorieTotal} calories</p>
        <p>{props.fatTotal}g fat</p>
        <p>{props.carbTotal}g carbohydrates</p>
        <p>{props.proteinTotal}g protein</p>
        <button
          onClick={props.handleExpand}
          className="btn btn-small btn-normal"
        >
          {props.expanded ? "Hide details" : "Show details"}
        </button>
      </div>
    </div>
  );
}
