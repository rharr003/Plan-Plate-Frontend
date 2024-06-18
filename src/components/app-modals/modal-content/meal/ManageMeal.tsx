import "./ManageMeal.css";
import { ManageMealProps } from "./ManageMeal.props";
import { useEffect, useState } from "react";
import Api from "../../../../PlanPlateApi";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import FoodItemList from "./food-item-list/FoodItemList";
import ModalHeader from "../shared/ModalHeader";
import { setFoodItems } from "../../../../redux/foodItemListReducer";
import { setFoodItems as setMealFoodItems } from "../../../../redux/mealReducer";
import SearchBar from "./food-item-list/search-bar/SearchBar";
import NewMeal from "./new-meal/NewMeal";
import { FoodItem } from "../../../../types/foodItem";
import { determineUpdates } from "./ManageMeal.util";
import { swapMeal } from "../../../../redux/mealPlanReducer";
export default function ManageMeal(props: ManageMealProps) {
  const foodItems = useAppSelector((state) => state.foodItemList.all);
  const selectedFoodItems = useAppSelector((state) => state.meal.foodItems);
  const filteredFoodItems = useAppSelector(
    (state) => state.foodItemList.filtered
  );
  const search = useAppSelector((state) => state.foodItemList.search);
  const [loading, setLoading] = useState(true);
  const isEditing = props.mealId ? true : false;
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetch() {
      const result = await Api.fetchFoodItems();
      dispatch(setFoodItems(result.data));
      if (props.mealId) {
        const meal = await Api.fetchMeal(props.mealId);
        console.log(meal.data.food_servings);
        dispatch(
          setMealFoodItems(
            meal.data.food_servings.map(
              (serving: {
                id: number;
                serving_multiple: number;
                food_item: FoodItem;
              }) => ({
                ...serving.food_item,
                servingId: serving.id,
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

  async function updateMeal(
    mealName: string,
    oldServings: any[],
    newServings: any[]
  ) {
    const [additions, edits] = determineUpdates(oldServings, newServings);
    const data = {
      name: mealName,
      additions: additions.map((serving) => ({
        food_item_id: serving.foodItemId,
        serving_multiple: serving.servingMultiple,
      })),
      edits: edits.map((serving) => ({
        food_serving_id: serving.servingId,
        serving_multiple: serving.servingMultiple,
      })),
    };
    const result = await Api.updateMeal({
      ...data,
      meal_id: props.mealId as number,
    });
    if (result.status === 200) {
      dispatch(swapMeal(result.data));
      props.closeModal();
    } else {
      alert("Failed to update meal");
    }
  }

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="manage-meal-container">
      <ModalHeader
        title={props.mealId ? "Edit Meal" : "Create Meal"}
        closeModal={props.closeModal}
      />
      <div className="create-meal-modal-body">
        <NewMeal
          selectedFoodItems={selectedFoodItems}
          createMeal={createMeal}
          updateMeal={updateMeal}
          mealId={props.mealId}
          mealName={props.mealName}
          isEditing={isEditing}
        />
        <div className="food-items-list-container">
          <SearchBar search={search} />
          <FoodItemList
            foodItems={search !== "" ? filteredFoodItems : foodItems}
            selectedFoodItems={selectedFoodItems}
            type="all"
            isEditing={false}
          />
        </div>
      </div>
    </div>
  );
}
