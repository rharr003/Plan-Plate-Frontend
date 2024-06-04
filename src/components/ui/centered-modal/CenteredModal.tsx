import Modal from "react-modal";
import { CenteredModalProps } from "./CenteredModal.props";
import { customStyles } from "./CenteredModal.constants";

export default function CenteredModal(props: CenteredModalProps) {
  return (
    <Modal
      isOpen={props.showModal}
      style={{
        ...customStyles,
        content: {
          ...customStyles.content,
          width: props.width,
          height: props.height,
        },
      }}
    >
      {props.children}
    </Modal>
  );
}
