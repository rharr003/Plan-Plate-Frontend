import { NewMealProps } from "./NewMeal.props";
import FoodItemList from "../food-item-list/FoodItemList";
import "./NewMeal.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";

export default function NewMeal(props: NewMealProps) {
  const servings = useAppSelector((state) => state.meal.servings);
  const [mealName, setMealName] = useState(props.mealName || "");
  const dispatch = useAppDispatch();

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setMealName(e.target.value);
  }

  function handleCreateMeal() {
    props.createMeal(mealName, servings);
  }

  function handleUpdateMeal() {}

  return (
    <div className="new-meal-container">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleChangeName}
        value={mealName}
      />
      <button
        type="submit"
        className="btn btn-submit"
        disabled={servings.length < 1 || !mealName}
        onClick={props.mealId ? handleUpdateMeal : handleCreateMeal}
      >
        {props.mealId ? "Update" : "Create"}
      </button>
      {props.mealId && (
        <button className="btn btn-info" onClick={handleCreateMeal}>
          Save new
        </button>
      )}
      <FoodItemList
        foodItems={props.selectedFoodItems}
        type="selected"
        mealId={props.mealId}
      />
    </div>
  );
}
