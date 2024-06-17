import "./CreateMeal.css";
import { CreateMealProps } from "./CreateMeal.props";
import { useEffect, useState } from "react";
import Api from "../../../../../PlanPlateApi";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import FoodItemList from "./food-item-list/FoodItemList";
import ModalHeader from "../../shared/ModalHeader";
import { setFoodItems } from "../../../../../redux/foodItemListReducer";
import { setFoodItems as setMealFoodItems } from "../../../../../redux/mealReducer";
import SearchBar from "./search-bar/SearchBar";
import NewMeal from "./new-meal/NewMeal";
import { foodItem } from "../../../../../types/food-item/foodItem";

export default function CreateMeal(props: CreateMealProps) {
  const foodItems = useAppSelector((state) => state.foodItemList.all);
  const selectedFoodItems = useAppSelector((state) => state.meal.foodItems);
  const filteredFoodItems = useAppSelector(
    (state) => state.foodItemList.filtered
  );
  const search = useAppSelector((state) => state.foodItemList.search);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetch() {
      const result = await Api.fetchFoodItems();
      dispatch(setFoodItems(result.data));
      if (props.mealId) {
        const meal = await Api.fetchMeal(props.mealId);
        dispatch(
          setMealFoodItems(
            meal.data.food_servings.map(
              (serving: {
                id: number;
                serving_multiple: number;
                food_item: foodItem;
              }) => ({
                ...serving.food_item,
                foodItemId: serving.food_item.id,
                servingMultiple: serving.serving_multiple,
              })
            )
          )
        );
      }
      setLoading(false);
    }
    fetch();
  }, []);

  async function createMeal(mealName: string, servings: any[]) {
    const data = {
      name: mealName,
      servings: servings.map((serving) => ({
        food_item_id: serving.foodItemId,
        serving_multiple: serving.servingMultiple,
      })),
    };
    const result = await Api.createMeal(data);
    if (result.status === 200) {
      props.closeModal();
    } else {
      alert("Failed to create meal");
    }
  }

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      <ModalHeader
        title={props.mealId ? "Edit Meal" : "Create Meal"}
        closeModal={props.closeModal}
      />
      <div className="create-meal-modal-body">
        <NewMeal
          selectedFoodItems={selectedFoodItems}
          createMeal={createMeal}
          mealId={props.mealId}
          mealName={props.mealName}
        />
        <div className="food-items-list-container">
          <SearchBar search={search} />
          <FoodItemList
            foodItems={search !== "" ? filteredFoodItems : foodItems}
            selectedFoodItems={selectedFoodItems}
            type="all"
          />
        </div>
      </div>
    </>
  );
}
