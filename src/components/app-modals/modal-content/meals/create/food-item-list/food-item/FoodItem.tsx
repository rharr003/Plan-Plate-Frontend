import "./FoodItem.css";
import { FoodItemProps } from "./FoodItem.props";
import { useState } from "react";
import { useAppDispatch } from "../../../../../../../redux/hooks";
import { openModal } from "../../../../../../../redux/modalReducer";
import FoodItemHeader from "./food-item-header/FoodItemHeader";

export default function FoodItem(props: FoodItemProps) {
  const [showDetail, setShowDetail] = useState(false);
  const dispatch = useAppDispatch();
  function handleDetailClick() {
    setShowDetail(!showDetail);
  }

  function triggerModal() {
    const context = { foodItem: props.foodItem };
    dispatch(openModal({ type: "edit-food-item", context, height: "70%" }));
  }

  return (
    <li
      key={props.foodItem.id}
      className={props.selected ? "selected food-item" : "food-item"}
    >
      <FoodItemHeader
        multiple={props.multiple}
        foodItem={props.foodItem}
        onDangerClick={props.onDangerClick}
        triggerModal={triggerModal}
        type={props.type}
        index={props.index}
        onAddClick={() =>
          props.onClick(props.foodItem, props.selected as boolean)
        }
        selected={props.selected}
      />
      <div className="macro-container">
        <p>{props.foodItem.calories * props.multiple} calories</p>
        <p>{props.foodItem.fat * props.multiple}g fat</p>
        <p>{props.foodItem.carbohydrates * props.multiple}g carbs</p>
        <p>{props.foodItem.protein * props.multiple}g protein</p>
        <button onClick={handleDetailClick} className="btn btn-normal">
          {showDetail ? "Hide" : "Show"} detail
        </button>
      </div>
      {showDetail && (
        <div className="micro-container">
          <p>{props.foodItem.saturated_fat * props.multiple}g saturated fat</p>
          <p>{props.foodItem.fiber * props.multiple}g fiber</p>
          <p>{props.foodItem.sugar * props.multiple}g sugar</p>
          <p>{props.foodItem.sodium * props.multiple}mg sodium</p>
          <p>{props.foodItem.potassium * props.multiple}mg potassium</p>
        </div>
      )}
    </li>
  );
}
