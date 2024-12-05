import { clsx, type ClassValue } from "clsx";
import { RegisterOptions } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export const baseUrl = "https://api.staging.lokatalent.com"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SignUpFormSchema1 = () =>
  z.object({
    text: z.string().min(2),
    newText: z.string().min(2),
    password: z.string().min(8),
    password2: z.string().min(8),
  });

export const authFormSchema = () =>
  z.object({
    email: z.string().email(),
    password: z.string().min(8),
    text: z.string().min(2),
  });

export const emailFormSchema1 = () =>
  z.object({
    email: z.string().email(),
  });

export const passwordFormSchema1 = () =>
  z.object({
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  });

 // For the Sign up  
export const SignUpFormSchema = z 
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email("Email is required").min(4, "Invalid email format"),
    number: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^[0-9]{10,15}$/, "Invalid phone number format"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error will show up on confirmPassword
  });

  // For the login page
export const LogInFormSchema = z.object({
  email: z.string().email("Email is required").min(4, "Invalid email format"),
  password: z.string().min(8),
});

// for the email veirification page
export const emailFormSchema = z.object({
  email: z.string().email("Invalid email format").min(4, "Email is required"),
});

export const addressVerificationFormSchema = z.object({
  addressVerify: z.string().min(1, "You must select a valid address verification"),
});

// for the password reset page
export const passwordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error will show up on confirmPassword
  });

export const allowedCountries = ["Nigeria", "India", "Senegal", "Australia"];
export const profileFormSchema = z.object({
  // dateOfBirth: z
  //   .string()
  //   .nonempty("Date of birth is required")
  //   .regex(
  //     /^\d{2}-\d{2}-\d{4}$/,
  //     "Date of birth must be in the format MM-DD-YYYY"
  //   ),
  // dateofBirth: z
  //   .string()
  //   .min(1, "Date of birth must be in the format MM-DD-YYYY"),
  dateofBirth: z.date({
    required_error: "Date of birth is required",
  }),
  city: z.string().min(2, "City must be at least 3 characters"),
  state: z.string().min(2, "State must be at least 3 characters"),
  // country: z.string(),
  // gender: z.string(),
  // country: z.string().min(1, "You must select a valid country"),
  // gender: z.string().min(1, "You must select a gender"),
  address: z.string().min(5, "Address must be at least 5 characters"),
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
  type: "text" | "email" | "password" | "number" | "select" | "date";
  label: string;
  validation: RegisterOptions;
  options?: string[];
}
