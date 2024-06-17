import "./AddEditMealContent.css";
import { AddEditMealContentProps } from "./AddEditMealContent.props";
import { useEffect, useState } from "react";
import Api from "../../../../../PlanPlateApi";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { openModal } from "../../../../../redux/modalReducer";
import ModalHeader from "../../shared/ModalHeader";
import MealListItem from "./meal/MealListItem";
import { Meal } from "../../../../../types/meal/meal";
import { setMeals } from "../../../../../redux/mealsListReducer";

export default function AddEditMealContent(props: AddEditMealContentProps) {
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
      {meals.map((meal) => (
        <MealListItem key={meal.id} meal={meal} />
      ))}
    </div>
  );
}
