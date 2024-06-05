import CenteredModal from "./CenteredModal";
import { render, screen } from "@testing-library/react";
import AddEditModalContent from "../../app-modals/modal-content/add-edit/AddEditModalContent";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
test("renders without crashing", () => {
  render(
    <Provider store={store}>
      <CenteredModal showModal={true} closeModal={() => {}}>
        <AddEditModalContent closeModal={() => {}} isEditing={false} />
      </CenteredModal>
    </Provider>
  );

  const title = screen.getByText("Create New Meal Plan");
  expect(title).toBeInTheDocument();
});
