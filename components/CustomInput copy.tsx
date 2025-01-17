import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Control, FieldPath } from "react-hook-form";
import type { z } from "zod";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");
interface CustomInput {
	control: Control<z.infer<typeof formSchema>>;
	input: FieldPath<z.infer<typeof formSchema>>;
	label: string;
	placeholder: string;
}
const CustomInput = ({ control, input, label, placeholder }: CustomInput) => {
	return (
		<div >
			<FormField
				control={control}
				name={input}
				render={({ field }) => (
					<FormItem className="form-item">
						<FormLabel className="form-label">{label}</FormLabel>
						<FormControl>
							<Input
								placeholder={placeholder}
								className="input-class"
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
