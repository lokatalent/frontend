import { clsx, type ClassValue } from "clsx";
import { RegisterOptions } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SignUpFormSchema1 = (type: string) =>
  z.object({
    text: z.string().min(2),
    newText: z.string().min(2),
    password: z.string().min(8),
    password2: z.string().min(8),
  });

export const authFormSchema = (type: string) =>
  z.object({
    email: z.string().email(),
    password: z.string().min(8),
    text: z.string().min(2),
  });

export const emailFormSchema1 = () =>
  z.object({
    email: z.string().email(),
  });

export const passwordFormSchema1 = (type: string) =>
  z.object({
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  });

export const SignUpFormSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  ewPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export const LogInFormSchema = z.object({
  email: z.string().email("Invalid email format").min(4, "Email is required"),
  password: z.string().min(8),
});

export const emailFormSchema = z.object({
  email: z.string().email("Invalid email format").min(4, "Email is required"),
});
export const passwordFormSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});

// username: z
//   .string()
//   .min(3, "Username must be at least 3 characters")
//   .max(50, "Username must be less than 50 characters"),
// export type FormData = z.infer<typeof formSchema>;

interface FormData {
  username: string;
  email: string;
  password: string;
  [key: string]: string; // Allow for dynamic fields
}

export interface FieldConfig {
  name: keyof FormData;
  type: "text" | "email" | "password";
  label: string;
  validation: RegisterOptions;
}
