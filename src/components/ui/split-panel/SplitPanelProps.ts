import { ReactNode } from "react";

export interface SplitPanelProps {
  image: string;
  imageAlt: string;
  heading1: string;
  heading2: string;
  subHeading: string;
  children: ReactNode;
}
