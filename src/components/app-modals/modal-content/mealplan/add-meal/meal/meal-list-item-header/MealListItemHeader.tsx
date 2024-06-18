import "./MealListItemHeader.css";
import { MealListItemHeaderProps } from "./MealListItemHeader.props";

export default function MealListItemHeader(props: MealListItemHeaderProps) {
  return (
    <div className="meal-header">
      <div className="meal-header-controls">
        <h3>{props.name}</h3>
        <div>
          {!props.hideSelect && (
            <button
              className="btn btn-small btn-submit"
              onClick={props.handleSelect}
            >
              Select
            </button>
          )}
          {props.hideSelect && (
            <>
              <button className="btn btn-normal" onClick={props.moveUp}>
                <i className="arrow up"></i>
              </button>
              <button className="btn btn-normal" onClick={props.moveDown}>
                <i className="arrow down"></i>
              </button>
            </>
          )}

          <button
            className="btn btn-small btn-warning"
            onClick={props.triggerModal}
          >
            Edit
          </button>
          <button
            className="btn btn-small btn-delete"
            onClick={props.handleDeleteMeal}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="meal-stats">
        <p>
          <b>Calories: </b>
          {props.calorieTotal.toFixed(0)}
        </p>
        <p>
          <b>Fat: </b>
          {props.fatTotal.toFixed(0)}g
        </p>
        <p>
          <b>Carbs: </b>
          {props.carbTotal.toFixed(0)}g
        </p>
        <p>
          <b>Protein: </b>
          {props.proteinTotal.toFixed(0)}g
        </p>
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
