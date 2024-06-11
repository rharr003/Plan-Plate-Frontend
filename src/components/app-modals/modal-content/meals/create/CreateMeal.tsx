import "./CreateMeal.css";
import { CreateMealProps } from "./CreateMeal.props";
import { useEffect, useState } from "react";
import Api from "../../../../../PlanPlateApi";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { openModal } from "../../../../../redux/modalReducer";
import FoodItemList from "./food-item-list/FoodItemList";
import ModalHeader from "../../shared/ModalHeader";
import { setSearch, setFoodItems } from "../../../../../redux/foodItemReducer";
export default function CreateMeal(props: CreateMealProps) {
  const foodItems = useAppSelector((state) => state.foodItem.all);
  const selectedFoodItems = useAppSelector((state) => state.foodItem.selected);
  const filteredFoodItems = useAppSelector((state) => state.foodItem.filtered);
  const search = useAppSelector((state) => state.foodItem.search);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  function handleSelectFoodItem(foodItemId: number) {}

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearch(e.target.value));
  }

  function triggerModal(type: string) {
    const context = {};
    dispatch(
      openModal({
        type,
        context,
      })
    );
  }

  useEffect(() => {
    async function fetch() {
      const result = await Api.fetchFoodItems();
      dispatch(setFoodItems(result.data));
      setLoading(false);
    }
    fetch();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      <ModalHeader title="Create Meal" closeModal={props.closeModal} />
      <div className="create-meal-modal-body">
        <form className="create-meal-left">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
          <button type="submit" className="btn btn-submit">
            Create
          </button>
        </form>
        <FoodItemList
          foodItems={search !== "" ? filteredFoodItems : foodItems}
          search={search}
          handleSearch={handleSearch}
          selectedFoodItems={selectedFoodItems}
          handleSelectFoodItem={handleSelectFoodItem}
          triggerModal={triggerModal}
        />
      </div>
    </>
  );
}
