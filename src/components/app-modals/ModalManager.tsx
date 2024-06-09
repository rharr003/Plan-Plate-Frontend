import CenteredModal from "../ui/centered-modal/CenteredModal";
import AddEditModalContent from "./modal-content/add-edit/AddEditModalContent";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { closeModal } from "../../redux/modalReducer";

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
    default:
      ComponentToRender = <div>Error</div>;
      break;
  }

  return (
    <CenteredModal closeModal={close} showModal={showModal}>
      {ComponentToRender}
    </CenteredModal>
  );
}
