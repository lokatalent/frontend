

// FormFieldError.tsx
interface FormFieldErrorProps {
  error?: FieldError;
}

export const FormFieldError: React.FC<FormFieldErrorProps> = ({ error }) => {
  console.log(error)
  if (!error) return null;

  return (
    <p className="text-red-500 text-sm" role="alert">
      {error.message}
    </p>
  );
};
