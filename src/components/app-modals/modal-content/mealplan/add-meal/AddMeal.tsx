import "./AddMeal.css";
import { AddMealProps } from "./AddMeal.props";
import { useEffect, useState } from "react";
import Api from "../../../../../PlanPlateApi";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { openModal } from "../../../../../redux/modalReducer";
import ModalHeader from "../../shared/ModalHeader";
import MealListItem from "./meal/MealListItem";
import { Meal } from "../../../../../types/meal";
import { setMeals, deleteMeal } from "../../../../../redux/mealsListReducer";
import { addMealToPlan } from "../../../../../redux/mealPlanReducer";

export default function AddMeal(props: AddMealProps) {
  const meals = useAppSelector((state) => state.mealsList.meals);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  function triggerModal() {
    const context = {};
    dispatch(
      openModal({
        type: "create-meal",
        context,
        height: "75%",
        width: "75%",
      })
    );
  }

  async function handleSelect(mealId: number) {
    const result = await Api.addMealToPlan(props.mealPlanId, mealId);
    if (result.status === 200) {
      const meal = meals.find((meal) => meal.id === mealId);
      if (meal) {
        dispatch(addMealToPlan(meal));
      }
      props.closeModal();
      return;
    } else {
      alert("There was an issue adding the meal to the plan");
    }
  }

  async function handleDeleteMeal(mealId: number) {
    const result = await Api.deleteMeal(mealId);
    if (result.status === 200) {
      dispatch(deleteMeal({ mealId }));
    } else {
      alert("There was an issue deleting this meal");
    }
  }

  useEffect(() => {
    async function fetch() {
      const result = await Api.fetchMeals();
      if (result.status === 200) {
        dispatch(setMeals(result.data as Meal[]));
      } else {
        alert("There was an issue fetching your meals");
      }
      setLoading(false);
    }
    fetch();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <div>
      <ModalHeader title="Meals" closeModal={props.closeModal} />
      <button className="btn btn-info" onClick={triggerModal}>
        Create new meal
      </button>
      {!meals.length && <p>You haven't created any meals yet</p>}
      {meals.map((meal, index) => (
        <MealListItem
          key={meal.id}
          meal={meal}
          handleSelect={handleSelect}
          handleRemove={handleDeleteMeal}
          index={index}
          isLast={index === meals.length - 1}
        />
      ))}
    </div>
  );
}
