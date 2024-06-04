import CenteredModal from "../../ui/centered-modal/CenteredModal";
import { useState } from "react";
import { mealPlanModalStackElement } from "../../../types/meal-plans/mealPlanModalStackElement";
import AddModalContent from "./modal-content/add-edit/AddModalContent";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { popModalStack } from "../../../redux/mealPlanReducer";

export default function ModalManager() {
  const modalStack = useAppSelector((state) => state.mealPlan.modalStack);
  const showModal = modalStack.length > 0;
  const currStackElement = modalStack[modalStack.length - 1];
  const dispatch = useAppDispatch();

  function closeCurrent() {
    dispatch(popModalStack());
  }

  let ComponentToRender;
  switch (currStackElement?.type) {
    case "add-new":
      ComponentToRender = <AddModalContent closeModal={closeCurrent} />;
      break;
    default:
      ComponentToRender = <div>Error</div>;
      break;
  }

  return (
    <CenteredModal closeModal={closeCurrent} showModal={showModal}>
      {ComponentToRender}
    </CenteredModal>
  );
}
