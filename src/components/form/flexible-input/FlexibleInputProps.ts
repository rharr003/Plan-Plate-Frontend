export interface FlexibleInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | undefined | number;
  errorMessage?: string;
  labelText: string;
  placeholder?: string;
  name: string;
  type?: string;
}
