import "./FoodItem.css";
import { FoodItemProps } from "./FoodItem.props";
import { useState } from "react";
import Api from "../../../../../../../PlanPlateApi";
import { useAppDispatch } from "../../../../../../../redux/hooks";
import { deleteFoodItem } from "../../../../../../../redux/foodItemReducer";

export default function FoodItem(props: FoodItemProps) {
  const [showDetail, setShowDetail] = useState(false);
  const dispatch = useAppDispatch();
  function handleDetailClick() {
    setShowDetail(!showDetail);
  }

  async function handleDelete() {
    const result = await Api.deleteFoodItem(props.foodItem.id);
    if (result.status === 204) {
      dispatch(deleteFoodItem(props.foodItem.id));
    } else {
      alert("Failed to delete food item");
    }
  }
  return (
    <li
      key={props.foodItem.id}
      className={props.selected ? "selected food-item" : "food-item"}
      onClick={() => props.handleSelectFoodItem(props.foodItem.id)}
    >
      <div className="food-item-header">
        <h4>{props.foodItem.name}</h4>
        <div>
          <button className="btn btn-warning">Edit</button>
          <button className="btn btn-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      <div className="macro-container">
        <p>{props.foodItem.calories} calories</p>
        <p>{props.foodItem.fat}g fat</p>
        <p>{props.foodItem.carbohydrates}g carbs</p>
        <p>{props.foodItem.protein}g protein</p>
        <button onClick={handleDetailClick} className="btn btn-normal">
          {showDetail ? "Hide" : "Show"} detail
        </button>
      </div>
      {showDetail && (
        <div className="micro-container">
          <p>{props.foodItem.saturated_fat}g saturated fat</p>
          <p>{props.foodItem.fiber}g fiber</p>
          <p>{props.foodItem.sugar}g sugar</p>
          <p>{props.foodItem.sodium}mg sodium</p>
          <p>{props.foodItem.potassium}mg potassium</p>
        </div>
      )}
    </li>
  );
}
