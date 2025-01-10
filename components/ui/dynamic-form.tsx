import React, { useState } from 'react';
import { useForm,  RegisterOptions } from 'react-hook-form';
// import { Alert } from '@/components/ui/alert';

// Type definitions
interface FormData {
  username: string;
  email: string;
  password: string;
  [key: string]: string; // Allow for dynamic fields
}

interface FieldConfig {
  name: keyof FormData;
  type: 'text' | 'email' | 'password';
  label: string;
  validation: RegisterOptions;
}

const StraightForm: React.FC = () => {
  const [savedData, setSavedData] = useState<FormData | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

  // Form fields configuration
  const fields: FieldConfig[] = [
    {
      name: 'username',
      type: 'text',
      label: 'Username',
      validation: {
        required: 'Username is required',
        minLength: {
          value: 3,
          message: 'Username must be at least 3 characters'
        }
      }
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      validation: {
        required: 'Email is required',
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: 'Invalid email format'
        }
      }
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      validation: {
        required: 'Password is required',
        minLength: {
          value: 6,
          message: 'Password must be at least 6 characters'
        },
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          message: 'Password must contain at least one letter and one number'
        }
      }
    }
  ];

  const onSubmit = (data: FormData): void => {

    setSavedData(data);
    reset();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label 
              htmlFor={field.name}
              className="block text-sm font-medium"
            >
              {field.label}
            </label>
            <input
              id={field.name}
              {...register(field.name, field.validation)}
              type={field.type}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-invalid={errors[field.name] ? "true" : "false"}
            />
            {errors[field.name] && (
              <p 
                className="text-red-500 text-sm" 
                role="alert"
              >
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>

      {savedData && (
        <div className="mt-4">
          <h3 className="font-medium">Saved Data:</h3>
          <pre className="mt-2 text-sm">
            {JSON.stringify(savedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default StraightForm;
