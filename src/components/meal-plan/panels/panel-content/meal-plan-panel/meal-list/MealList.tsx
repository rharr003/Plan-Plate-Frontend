import "./MealList.css";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import MealListItem from "../../../../../app-modals/modal-content/mealplan/add-meal/meal/MealListItem";
import { removeMealFromPlan } from "../../../../../../redux/mealPlanReducer";
import Api from "../../../../../../PlanPlateApi";
import { MealListProps } from "./MealList.props";
import {
  moveMealUp,
  moveMealDown,
} from "../../../../../../redux/mealPlanReducer";

export default function MealList(props: MealListProps) {
  const meals = useAppSelector((state) => state.mealPlan.current!.meals);
  const dispatch = useAppDispatch();
  function handleSelect() {
    return;
  }

  async function handleDelete(mealId: number) {
    const index = meals.findIndex((meal) => meal.id === mealId);
    const result = await Api.removeMealFromPlan(props.mealPlanId, index);
    if (result.status !== 204) {
      alert("Failed to remove meal from plan");
      return;
    }
    dispatch(removeMealFromPlan(mealId));
    return;
  }
  if (!meals.length) {
    return <h1>Add a meal to get started!</h1>;
  }

  async function moveUp(index: number) {
    if (index === 0) return;
    dispatch(moveMealUp(index));
    const result = await Api.swapMealPlanMeals(
      props.mealPlanId,
      index,
      index - 1
    );
    if (result.status !== 200) {
      alert("Failed to move meal up");
    }
  }

  async function moveDown(index: number) {
    if (index === meals.length - 1) return;
    dispatch(moveMealDown(index));
    const result = await Api.swapMealPlanMeals(
      props.mealPlanId,
      index,
      index + 1
    );
    if (result.status !== 200) {
      alert("Failed to move meal down");
    }
  }
  return (
    <div className="meal-list-container">
      {meals.map((meal, index) => (
        <MealListItem
          key={meal.id}
          meal={meal}
          handleSelect={handleSelect}
          handleRemove={handleDelete}
          hideSelect={true}
          index={index}
          moveUp={moveUp}
          moveDown={moveDown}
        />
      ))}
    </div>
  );
}
