import "./ModalHeader.css";
import { ModalHeaderProps } from "./ModalHeader.props";

export default function ModalHeader(props: ModalHeaderProps) {
  return (
    <div className="modal-header">
      <h2>{props.title}</h2>
      <button className="btn btn-normal" onClick={props.closeModal}>
        X
      </button>
    </div>
  );
}
