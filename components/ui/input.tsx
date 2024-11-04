"use client";
import { cn } from "@/lib/utils";
import * as React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type: initialType, ...props }, ref) => {
		// console.log(props)
		// State to track password visibility
		const [showPassword, setShowPassword] = React.useState(false);

		// Determine the actual input type based on the initial type and showPassword state
		const type =
			initialType === "password"
				? showPassword
					? "text"
					: "password"
				: initialType;

		// Toggle password visibility
		const togglePasswordVisibility = (e: React.MouseEvent) => {
			e.preventDefault();
			setShowPassword((prev) => !prev);
		};

		return (
			<div className="relative flex flex-col">
				<input
					type={type}
					className={cn(
						"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
						// Add right padding when type is password to prevent text overlap with the icon
						initialType === "password" ? "pr-10" : "",
						className,
					)}
					ref={ref}
					{...props}
				/>
				{initialType === "password" && (
					<button
						type="button"
						onClick={togglePasswordVisibility}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
						aria-label={showPassword ? "Hide password" : "Show password"}
					>
						{showPassword ? (
							<FaEye className="h-4 w-4" />
						) : (
							<FaEyeSlash className="h-4 w-4" />
						)}
					</button>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";

export { Input };
