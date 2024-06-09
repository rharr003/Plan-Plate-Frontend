import "./MealList.css";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";

export default function MealList() {
  const meals = useAppSelector((state) => state.mealPlan.current!.meals);
  if (!meals.length) {
    return <h1>Add a meal to get started!</h1>;
  }
}
