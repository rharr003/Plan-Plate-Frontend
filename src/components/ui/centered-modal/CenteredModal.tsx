import Modal from "react-modal";
import { CenteredModalProps } from "./CenteredModal.props";
import { customStyles } from "./CenteredModal.constants";

export default function CenteredModal(props: CenteredModalProps) {
  return (
    <Modal
      isOpen={props.showModal}
      ariaHideApp={false}
      style={{
        ...customStyles,
        content: {
          ...customStyles.content,
          width: props.width ? props.width : "50%",
          height: props.height ? props.height : "50%",
        },
      }}
    >
      {props.children}
    </Modal>
  );
}
