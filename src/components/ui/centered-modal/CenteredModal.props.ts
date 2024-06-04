import { ReactNode } from "react";

export interface CenteredModalProps {
  showModal: boolean;
  closeModal: () => void;
  children: JSX.Element;
  width?: string;
  height?: string;
}
