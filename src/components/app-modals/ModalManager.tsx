import CenteredModal from "../ui/centered-modal/CenteredModal";
import AddEditModalContent from "./modal-content/mealplan/AddEditModalContent";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { closeModal } from "../../redux/modalReducer";
import AddEditMealContent from "./modal-content/meals/add-edit/AddEditMealContent";
import CreateMeal from "./modal-content/meals/create/CreateMeal";
import CreateFoodItem from "./modal-content/food-items/CreateFoodItem";

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
        <AddEditModalContent closeModal={close} isEditing={false} />
      );
      break;
    case "rename":
      ComponentToRender = (
        <AddEditModalContent
          closeModal={close}
          isEditing={true}
          mealPlanId={currStackElement.context?.mealPlanId as number}
          initialName={currStackElement.context?.mealPlanName}
        />
      );
      break;
    case "add-meal":
      ComponentToRender = (
        <AddEditMealContent
          closeModal={close}
          mealPlanId={currStackElement.context?.mealPlanId as number}
          mealPlanName={currStackElement.context?.mealPlanName as string}
        />
      );
      break;
    case "create-meal":
      ComponentToRender = <CreateMeal closeModal={close} />;
      break;
    case "create-food-item":
      ComponentToRender = <CreateFoodItem closeModal={close} />;
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
