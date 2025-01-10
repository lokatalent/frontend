"use client";
import { IoWarningOutline } from "react-icons/io5";
// FormFieldError.tsx
interface FormFieldErrorProps {
  error?: FieldError;
}

export const FormFieldError: React.FC<FormFieldErrorProps> = ({ error }) => {

  if (!error) return null;

  return (
    <p className="text-[#14141699] text-[10px] items-center flex mt-1" role="alert">
      <IoWarningOutline color="ed" size={16} className="text-[#FFB82E] mr-1" />
      {error.message}
    </p>
  );
};
