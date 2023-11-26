type Validator = (value: string) => string | void;

export interface Props {
  modelValue: string;
  autocomplete?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  width?: string | number;
  customValidation?: Validator | Validator[];
}

export interface Emit {
  (e: 'update:modelValue', value: string): void;
}
