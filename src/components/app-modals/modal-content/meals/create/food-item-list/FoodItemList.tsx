import React from "react";
import FlexibleInput from "../../../../../form/flexible-input/FlexibleInput";
import "./FoodItemList.css";
import { FoodItemListProps } from "./FoodItemList.props";
import FoodItem from "./food-item/FoodItem";

export default function FoodItemList(props: FoodItemListProps) {
  return (
    <div className="food-item-list-main">
      <FlexibleInput
        labelText=""
        value={props.search}
        handleChange={props.handleSearch}
        name="search"
        placeholder="Search food items..."
      />
      <button
        className="btn btn-info"
        onClick={() => props.triggerModal("create-food-item")}
      >
        + Add New
      </button>
      <ul className="food-item-list">
        {props.foodItems.map((foodItem: any) => {
          return (
            <FoodItem
              key={foodItem.id}
              foodItem={foodItem}
              selected={props.selectedFoodItems.includes(foodItem.id)}
              handleSelectFoodItem={props.handleSelectFoodItem}
            />
          );
        })}
      </ul>
    </div>
  );
}
