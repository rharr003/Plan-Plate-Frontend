import NotFoundImage from "../../assets/notfound.png";
import { Link } from "react-router-dom";
import SplitPanel from "../../components/ui/split-panel/SplitPanel";
import {
  IMAGE_ALT,
  HEADING1,
  HEADING2,
  SUBHEADING,
} from "./NotFound.constants";
export default function NotFound() {
  return (
    <SplitPanel
      image={NotFoundImage}
      imageAlt={IMAGE_ALT}
      heading1={HEADING1}
      heading2={HEADING2}
      subHeading={SUBHEADING}
    >
      <Link to={"/"}>Take me home</Link>
    </SplitPanel>
  );
}
