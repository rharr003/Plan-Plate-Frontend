import CenteredModal from "../ui/centered-modal/CenteredModal";
import ManageMealPlan from "./modal-content/mealplan/manage/ManageMealPlan";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { closeModal } from "../../redux/modalReducer";
import AddMeal from "./modal-content/mealplan/add-meal/AddMeal";
import ManageMeal from "./modal-content/meal/ManageMeal";
import ManageFoodItem from "./modal-content/food-item/ManageFoodItem";
import { setFoodItems } from "../../redux/mealReducer";

export default function ModalManager() {
  const modalStack = useAppSelector((state) => state.modals.stack);
  const showModal = modalStack.length > 0;
  const currStackElement = modalStack[modalStack.length - 1];
  const dispatch = useAppDispatch();

  function close() {
    dispatch(closeModal());
  }

  let ComponentToRender;

  switch (currStackElement?.type) {
    case "add-new":
      ComponentToRender = (
        <ManageMealPlan closeModal={close} isEditing={false} isActive={false} />
      );
      break;
    case "rename":
      ComponentToRender = (
        <ManageMealPlan
          closeModal={close}
          isEditing={true}
          mealPlanId={currStackElement.context?.mealPlanId as number}
          initialName={currStackElement.context?.mealPlanName}
          isActive={currStackElement.context?.isActive as boolean}
        />
      );
      break;
    case "add-meal":
      ComponentToRender = (
        <AddMeal
          closeModal={close}
          mealPlanId={currStackElement.context?.mealPlanId as number}
          mealPlanName={currStackElement.context?.mealPlanName as string}
        />
      );
      break;
    case "create-meal":
      ComponentToRender = (
        <ManageMeal
          closeModal={() => {
            close();
            dispatch(setFoodItems([]));
          }}
        />
      );
      break;
    case "edit-meal":
      ComponentToRender = (
        <ManageMeal
          closeModal={() => {
            close();
            dispatch(setFoodItems([]));
          }}
          mealId={currStackElement.context?.mealId}
          mealName={currStackElement.context?.mealName}
        />
      );
      break;
    case "create-food-item":
      ComponentToRender = <ManageFoodItem closeModal={close} />;
      break;
    case "edit-food-item":
      ComponentToRender = (
        <ManageFoodItem
          closeModal={close}
          foodItem={currStackElement.context?.foodItem}
        />
      );
      break;

    default:
      ComponentToRender = <div>Error</div>;
      break;
  }

  return (
    <CenteredModal
      closeModal={close}
      showModal={showModal}
      height={currStackElement?.height}
      width={currStackElement?.width}
    >
      {ComponentToRender}
    </CenteredModal>
  );
}
