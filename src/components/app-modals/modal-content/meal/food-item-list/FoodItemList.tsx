import { FoodItem } from "../../../../../types/foodItem";
import "./FoodItemList.css";
import { FoodItemListProps } from "./FoodItemList.props";
import FoodListItem from "./food-list-item/FoodListItem";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { deleteFoodItem } from "../../../../../redux/foodItemListReducer";
import { addToMeal, removeFromMeal } from "../../../../../redux/mealReducer";
import Api from "../../../../../PlanPlateApi";

export default function FoodItemList(props: FoodItemListProps) {
  const dispatch = useAppDispatch();
  const servings = useAppSelector((state) => state.meal.servings);

  async function handleClickItem(foodItem: FoodItem, selected: boolean) {
    dispatch(addToMeal(foodItem));
  }

  async function handleDelete(foodItemId: number) {
    const result = await Api.deleteFoodItem(foodItemId);
    if (result.status === 204) {
      dispatch(deleteFoodItem(foodItemId));
      dispatch(removeFromMeal(foodItemId));
    } else {
      alert("Failed to delete food item");
    }
  }

  async function handleRemoveFromMeal(foodItemId: number, index?: number) {
    dispatch(removeFromMeal(foodItemId));
    if (props.mealId) {
      const result = await Api.deleteMealItem(props.mealId, index as number);
      if (result.status !== 204) {
        alert("Failed to remove item from meal");
      }
    }
  }

  return (
    <ul className="food-item-list">
      {props.foodItems.map((foodItem: any, index) => {
        const selected = props.selectedFoodItems
          ? props.selectedFoodItems.some((item: any) => item.id === foodItem.id)
          : false;
        let servingMultiple = 1;
        const serving = servings.find(
          (serving) => serving.foodItemId === foodItem.id
        );
        if (serving && !selected) {
          servingMultiple = serving.servingMultiple;
        }
        return (
          <FoodListItem
            key={foodItem.id}
            index={index}
            foodItem={foodItem}
            selected={selected}
            onClick={handleClickItem}
            type={props.type}
            onDangerClick={
              props.type === "all" ? handleDelete : handleRemoveFromMeal
            }
            multiple={servingMultiple}
            isEditing={props.isEditing}
          />
        );
      })}
    </ul>
  );
}
