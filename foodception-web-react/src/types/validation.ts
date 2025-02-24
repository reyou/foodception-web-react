// Validation rule types
export type ValidationRule = 'FORMAT' | 'REQUIRED_FIELD' | string;

// Field violation interface for validation errors
export interface FieldViolation {
  field: string;
  description: string;
  violatedRule: ValidationRule;
  data?: {
    type?: string;
    [key: string]: any;
  };
}

// Validation error structure
export interface ValidationError {
  fieldViolations: FieldViolation[];
}
