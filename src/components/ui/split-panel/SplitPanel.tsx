import "./SplitPanel.css";
import { SplitPanelProps } from "./SplitPanelProps";

export default function SplitPanel(props: SplitPanelProps) {
  return (
    <div className="centered">
      <div className="split-panel-container">
        <img
          src={props.image}
          alt={props.imageAlt}
          className="split-panel-image"
        ></img>
        <div className="split-panel-right-container">
          <div className="split-panel-heading-container">
            <h1 className="split-panel-heading">
              {props.heading1}
              <br></br>
              {props.heading2}
            </h1>
          </div>
          <h2>{props.subHeading}</h2>
          {props.children}
        </div>
      </div>
    </div>
  );
}
