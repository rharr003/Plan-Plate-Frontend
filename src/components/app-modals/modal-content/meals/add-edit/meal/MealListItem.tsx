import "./MealListItem.css";
import { MealListItemProps } from "./MealListItem.props";
import MealListItemHeader from "./meal-list-item-header/MealListItemHeader";
import { useState } from "react";
import { useAppDispatch } from "../../../../../../redux/hooks";
import Api from "../../../../../../PlanPlateApi";
import { deleteMeal } from "../../../../../../redux/mealsListReducer";
import { openModal } from "../../../../../../redux/modalReducer";

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

  async function handleDeleteMeal() {
    const result = await Api.deleteMeal(props.meal.id);
    if (result.status === 200) {
      dispatch(deleteMeal({ mealId: props.meal.id }));
    } else {
      alert("There was an issue deleting this meal");
    }
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
        handleDeleteMeal={handleDeleteMeal}
        triggerModal={triggerModal}
      />
      {expanded &&
        props.meal.food_servings.map((foodServing) => (
          <div key={foodServing.id}>
            <p>
              -{" "}
              {foodServing.food_item.base_serving_size *
                foodServing.serving_multiple}
              {foodServing.food_item.base_serving_size_unit}{" "}
              {foodServing.food_item.name}
            </p>
          </div>
        ))}
    </div>
  );
}
