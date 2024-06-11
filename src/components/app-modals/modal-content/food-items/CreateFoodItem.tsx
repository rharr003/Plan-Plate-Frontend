import "./CreateFoodItem.css";
import { CreateFoodItemProps } from "./CreateFoodItem.props";
import useForm from "../../../../hooks/useForm";
import {
  initialFormData,
  CreateFoodItemFormData,
} from "./CreateFoodItem.contants";
import Api from "../../../../PlanPlateApi";
import { mergeData } from "../../../form/flexible-form/FlexibleForm.utils";
import ModalHeader from "../shared/ModalHeader";

export default function CreateFoodItem(props: CreateFoodItemProps) {
  const [formData, setFormData, isValid, setErrors] = useForm(initialFormData);
  const canSubmit = isValid("main");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await Api.createFoodItem(
      mergeData(formData) as CreateFoodItemFormData
    );
    if (result.status === 200) {
      props.closeModal();
    } else {
      alert("There was an issue creating the food item");
    }
  }
  return (
    <div>
      <ModalHeader title="Create Food Item" closeModal={props.closeModal} />
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
                  <option value="fl oz">fl oz</option>
                  <option value="cup">cup</option>
                  <option value="tbsp">tbsp</option>
                  <option value="tsp">tsp</option>
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
          Create
        </button>
      </form>
    </div>
  );
}
