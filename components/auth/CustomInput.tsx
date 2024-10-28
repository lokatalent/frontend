import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/formNew";
import { Input } from "@/components/ui/input";
import type { Control, FieldPath } from "react-hook-form";
import type { z } from "zod";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");
interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  input: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  name: string;
  placeholder: string;
  width: string;
}
const CustomInput = ({
  control,
  input,
  name,
  label,
  placeholder,
  width,
}: CustomInput) => {
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="form-item">
    
            <FormLabel className="form-label">{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                className={`input-class ${width}  bg-white h-[3rem]`}
                type={input === "password" ? "password" : "text"}
                {...field}
              />
            </FormControl>

            <FormMessage className="form-message mt-2" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomInput;
