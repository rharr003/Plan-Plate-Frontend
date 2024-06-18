import "./ManageFoodItem.css";
import { ManageFoodItemProps } from "./ManageFoodItem.props";
import useForm from "../../../../hooks/useForm";
import {
  initialFormData,
  prePopulatedFormData,
  CreateFoodItemFormData,
} from "./ManageFoodItem.contants";
import Api from "../../../../PlanPlateApi";
import { mergeData } from "../../../form/flexible-form/FlexibleForm.utils";
import ModalHeader from "../shared/ModalHeader";

export default function ManageFoodItem(props: ManageFoodItemProps) {
  const [formData, setFormData, isValid, setErrors] = useForm(
    props.foodItem ? prePopulatedFormData(props.foodItem) : initialFormData
  );
  const canSubmit = isValid("main");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let result;
    if (props.foodItem) {
      const data = mergeData(formData) as CreateFoodItemFormData;

      result = await Api.updateFoodItem({
        ...data,
        food_item_id: props.foodItem.id,
      });
    } else {
      result = await Api.createFoodItem(
        mergeData(formData) as CreateFoodItemFormData
      );
    }
    if (result.status === 200) {
      props.closeModal();
    } else {
      alert("There was an issue creating the food item");
    }
  }
  return (
    <div>
      <ModalHeader
        title={props.foodItem ? "Edit food" : "Add new food"}
        closeModal={props.closeModal}
      />
      <form className="create-food-item-form" onSubmit={handleSubmit}>
        {Object.keys(formData.main).map((key) => {
          const { label, error, type, value } = formData.main[key];
          return (
            <div className="nice-form-group food-item-input-group" key={key}>
              <label htmlFor={key}>{label}</label>
              <small>{error}</small>

              {key === "base_serving_size_unit" ? (
                <select
                  name="base_serving_size_unit"
                  aria-label="base_serving_size_unit"
                  value={formData.main.base_serving_size_unit.value}
                  onChange={(e) => setFormData(e, "main")}
                >
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="oz">oz</option>
                  <option value="cup">cup</option>
                  <option value="tbsp">tbsp</option>
                  <option value="whole">whole</option>
                </select>
              ) : (
                <input
                  type={type}
                  name={key}
                  aria-label={key}
                  value={value}
                  onChange={(e) => setFormData(e, "main")}
                />
              )}
            </div>
          );
        })}
        <button type="submit" disabled={!canSubmit} className="btn btn-submit">
          {props.foodItem ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
