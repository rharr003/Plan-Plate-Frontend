import "./FoodListItem.css";
import { FoodListItemProps } from "./FoodListItem.props";
import { useState } from "react";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { openModal } from "../../../../../../redux/modalReducer";
import FoodItemHeader from "./food-item-header/FoodItemHeader";

export default function FoodListItem(props: FoodListItemProps) {
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
        isEditing={props.isEditing}
        selected={props.selected}
      />
      <div className="macro-container">
        <p>{(props.foodItem.calories * props.multiple).toFixed(1)} calories</p>
        <p>{(props.foodItem.fat * props.multiple).toFixed(1)}g fat</p>
        <p>
          {(props.foodItem.carbohydrates * props.multiple).toFixed(1)}g carbs
        </p>
        <p>{(props.foodItem.protein * props.multiple).toFixed(1)}g protein</p>
        <button onClick={handleDetailClick} className="btn btn-normal">
          {showDetail ? "Hide" : "Show"} detail
        </button>
      </div>
      {showDetail && (
        <div className="micro-container">
          <p>
            {(props.foodItem.saturated_fat * props.multiple).toFixed(1)}g
            saturated fat
          </p>
          <p>{(props.foodItem.fiber * props.multiple).toFixed(1)}g fiber</p>
          <p>{(props.foodItem.sugar * props.multiple).toFixed(1)}g sugar</p>
          <p>{(props.foodItem.sodium * props.multiple).toFixed(1)}mg sodium</p>
          <p>
            {(props.foodItem.potassium * props.multiple).toFixed(1)}mg potassium
          </p>
        </div>
      )}
    </li>
  );
}
