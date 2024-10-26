import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SignUpFormSchema = (type: string) =>
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
const formSchema = authFormSchema(type);


export const emailFormSchema = (type: string) =>
  z.object({
    email: z.string().email(),
  });
