import React from "react";

export interface FormControlProps {
  showSecondary: boolean;
  secondaryOnClick?: () => void;
  secondaryDisabled?: boolean;
  primaryOnClick: (e?: any) => void;
  primaryDisabled: boolean;
  primaryText: string;
}
