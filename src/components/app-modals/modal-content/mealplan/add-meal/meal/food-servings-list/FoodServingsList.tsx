import { FoodServingsListProps } from "./FoodServingsList.props";
import "./FoodServingsList.css";
import { FoodServing } from "../../../../../../../types/foodServing";

export default function FoodServingsList(props: FoodServingsListProps) {
  return (
    <>
      {props.foodServings.map((foodServing: FoodServing) => (
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
    </>
  );
}
