import "./FoodItemHeader.css";
import { FoodItemHeaderProps } from "./FoodItemHeader.props";
import { useState } from "react";
import { updateServing } from "../../../../../../../redux/mealReducer";
import { useAppDispatch } from "../../../../../../../redux/hooks";

export default function FoodItemHeader(props: FoodItemHeaderProps) {
  const dispatch = useAppDispatch();
  const [servingSize, setServingSize] = useState(
    props.foodItem.base_serving_size * props.multiple + ""
  );
  const [servingSizeUnit, setServingSizeUnit] = useState(
    props.foodItem.base_serving_size_unit
  );

  function handleChangeServingSize(e: React.ChangeEvent<HTMLInputElement>) {
    const regex = /^\d*\.?\d{0,1}$/;
    if (!regex.test(e.target.value)) return;
    const multiple =
      parseFloat(e.target.value) / props.foodItem.base_serving_size;
    setServingSize(e.target.value);
    dispatch(
      updateServing({
        foodItemId: props.foodItem.id,
        servingMultiple: multiple,
      })
    );
  }

  function handleChangeServingSizeUnit(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    setServingSizeUnit(e.target.value);
  }

  return (
    <div className="food-item-header">
      {props.type === "all" ? (
        <h4>
          {props.foodItem.name} {props.foodItem.base_serving_size}(
          {props.foodItem.base_serving_size_unit})
        </h4>
      ) : (
        <div className="header-form">
          <h4>{props.foodItem.name}</h4>
          <div className="fake-input">
            <input
              type="number"
              step=".01"
              maxLength={5}
              value={servingSize}
              onChange={handleChangeServingSize}
            />
            <select
              value={servingSizeUnit}
              onChange={handleChangeServingSizeUnit}
              disabled
            >
              <option>{servingSizeUnit}</option>
            </select>
          </div>
        </div>
      )}

      <div>
        {props.type === "all" && (
          <>
            {!props.selected && (
              <button className="btn btn-normal" onClick={props.onAddClick}>
                add
              </button>
            )}
            <button className="btn btn-warning" onClick={props.triggerModal}>
              Edit
            </button>
          </>
        )}

        <button
          className="btn btn-delete"
          onClick={() => props.onDangerClick(props.foodItem.id, props.index)}
        >
          {props.type === "all" ? "Delete" : "Remove"}
        </button>
      </div>
    </div>
  );
}
