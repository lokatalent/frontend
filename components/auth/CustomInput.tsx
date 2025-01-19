import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/utils";
import type { Control, FieldPath } from "react-hook-form";
import type { z } from "zod";

const formSchema = authFormSchema();
interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  input: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  name: any;
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
