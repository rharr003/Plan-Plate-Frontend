interface FormValue {
  value: string | number;
  type: string;
  error: string;
  label: string;
}

export interface FlexibleFormProps {
  formData: {
    [key: string]: FormValue;
  };
  canProceed: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  primaryOnClick: (e?: any) => void;
  primaryText: string;
  showSecondary: boolean;
  secondaryOnClick?: () => void;
  secondaryDisabled?: boolean;
  linkHref: string;
  linkText: string;
}
