// DynamicForm.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldConfig, emailFormSchema, passwordFormSchema } from "@/lib/utils";
import { FormField } from "./FormField";
import ResetDialog from "@/components/auth/ResetDialog";
import { useRouter } from "next/navigation";

interface DynamicForm {
  fields: FieldConfig[];
  defaultValues: string;
  buttonAction: string;
}


const DynamicForm = ({ fields, defaultValues, schemaType, buttonAction }: DynamicForm) => {
  const router = useRouter();
  const [savedData, setSavedData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schemaType),
    defaultValues,
  });


  // const onSubmit = (data: FormData) => {
  //   try {
  //     // Simulate API call
  //     console.log('data')
  //     console.log("data");
  //     // await new Promise((resolve) => setTimeout(resolve, 1000));
  //     setSavedData(data);
  //     reset();
  //   } catch (error) {
  //     console.error("Form submission error:", error);
  //   }
  // };

  const onSubmit = (data: any) => {
    console.log('data')
    console.log(data);
    setSavedData(data.email);
    if (buttonAction === "reset-passowrd") {
      router.push("./reset-password/verify");
    }
    reset();

  };
  const onError = (data: any) => {
    console.log('error')
    console.log(data);
    setSavedData(data);
    reset();
  };

  return (
    <div className="w-full w-max mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-12  w-max">
        {fields.map((field) => (
          <div key={field.name}>
            <FormField
              key={field.name}
              name={field.name}
              // {...register(field.name, field.validation)}
              validation={field.validation}
              label={field.label}
              type={field.type}
              error={errors[field.name]}
              register={register}
              disabled={isSubmitting}
            />
          </div>
        ))}

        <div>

        {buttonAction === 'password' ? <ResetDialog /> :
          <button
          type="submit"
          // disabled={true}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>}
            </div>
      </form>

      {/* {savedData && (
        <div className="mt-4">
          <h3 className="font-medium">Saved Data:</h3>
          <pre className="mt-2 text-sm overflow-auto">
            {savedData}
          </pre>
        </div>
      )} */}
    </div>
  );
};

export default DynamicForm;
 