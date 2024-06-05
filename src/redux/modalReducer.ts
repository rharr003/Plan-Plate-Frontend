import { createSlice } from "@reduxjs/toolkit";
import { ModalStackElement } from "../types/general/modalStackElement";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    stack: [] as ModalStackElement[],
  },
  reducers: {
    openModal: (
      state,
      action: { payload: ModalStackElement; type: string }
    ) => {
      state.stack.push(action.payload);
    },
    closeModal: (state) => {
      state.stack.pop();
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
