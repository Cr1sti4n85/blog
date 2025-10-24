export type SignupFormState = {
  data: {
    name?: string;
    email?: string;
    password?: string;
  };
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
};
