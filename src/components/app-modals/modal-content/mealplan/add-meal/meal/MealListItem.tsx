import "./MealListItem.css";
import { MealListItemProps } from "./MealListItem.props";
import MealListItemHeader from "./meal-list-item-header/MealListItemHeader";
import { useState } from "react";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { openModal } from "../../../../../../redux/modalReducer";
import FoodServingsList from "./food-servings-list/FoodServingsList";
import {
  moveMealUp,
  moveMealDown,
} from "../../../../../../redux/mealPlanReducer";
import Api from "../../../../../../PlanPlateApi";

export default function MealListItem(props: MealListItemProps) {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const calorieTotal = props.meal.food_servings.reduce(
    (acc, foodServing) =>
      acc + foodServing.food_item.calories * foodServing.serving_multiple,
    0
  );
  const fatTotal = props.meal.food_servings.reduce(
    (acc, foodServing) =>
      acc + foodServing.food_item.fat * foodServing.serving_multiple,
    0
  );
  const carbTotal = props.meal.food_servings.reduce(
    (acc, foodServing) =>
      acc + foodServing.food_item.carbohydrates * foodServing.serving_multiple,
    0
  );
  const proteinTotal = props.meal.food_servings.reduce(
    (acc, foodServing) =>
      acc + foodServing.food_item.protein * foodServing.serving_multiple,
    0
  );

  function handleExpand() {
    setExpanded(!expanded);
  }

  // triggers modal for editing meal to open
  function triggerModal() {
    const context = { mealId: props.meal.id, mealName: props.meal.name };
    dispatch(
      openModal({
        type: "edit-meal",
        context,
        height: "75%",
        width: "75%",
      })
    );
  }
  return (
    <div className="meal">
      <MealListItemHeader
        name={props.meal.name}
        calorieTotal={calorieTotal}
        fatTotal={fatTotal}
        carbTotal={carbTotal}
        proteinTotal={proteinTotal}
        handleExpand={handleExpand}
        expanded={expanded}
        handleDeleteMeal={() => props.handleRemove(props.meal.id)}
        handleSelect={() => props.handleSelect(props.meal.id)}
        triggerModal={triggerModal}
        hideSelect={props.hideSelect}
        moveUp={() => props.moveUp(props.index)}
        moveDown={() => props.moveDown(props.index)}
      />
      {expanded && <FoodServingsList foodServings={props.meal.food_servings} />}
    </div>
  );
}
