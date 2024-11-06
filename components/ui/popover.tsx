"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
// import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverPortal = PopoverPrimitive.Portal;

const PopoverClose = PopoverPrimitive.Close;

// const PopoverOverlay = React.forwardRef<
//   React.ElementRef<typeof PopoverPrimitive.Overlay>,
//   React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Overlay>
// >(({ className, ...props }, ref) => (
//   <PopoverPrimitive.Overlay
//     ref={ref}
//     className={cn(
//       "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
//       className
//     )}
//     {...props}
//   />
// ));
// PopoverOverlay.displayName = PopoverPrimitive.Overlay.displayName;

let PopoverContentClassName = `fixed left-[50%] top-[50%] rt-PopperContent rt-PopoverContent z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] 
 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0
 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2
 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg`;
 
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <PopoverPortal>
    {/* <PopoverOverlay /> */}
    <PopoverPrimitive.Content
      
      ref={ref}
      className={cn(
        className
      )}
      {...props}
    >
      {children}
      {/* <PopoverPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <span className="sr-only">Close</span>
      </PopoverPrimitive.Close> */}
    </PopoverPrimitive.Content>
  </PopoverPortal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// const PopoverHeader = ({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div
//     className={cn(
//       "flex flex-col space-y-1.5 text-center sm:text-left",
//       className
//     )}
//     {...props}
//   />
// );
// PopoverHeader.displayName = "PopoverHeader";

// const PopoverFooter = ({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div
//     className={cn(
//       "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
//       className
//     )}
//     {...props}
//   />
// );
// PopoverFooter.displayName = "PopoverFooter";

// const PopoverTitle = React.forwardRef<
//   React.ElementRef<typeof PopoverPrimitive.Title>,
//   React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Title>
// >(({ className, ...props }, ref) => (
//   <PopoverPrimitive.Title
//     ref={ref}
//     className={cn(
//       "text-lg font-semibold leading-none tracking-tight",
//       className
//     )}
//     {...props}
//   />
// ));
// PopoverTitle.displayName = PopoverPrimitive.Title.displayName;

// const PopoverDescription = React.forwardRef<
//   React.ElementRef<typeof PopoverPrimitive.Description>,
//   React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Description>
// >(({ className, ...props }, ref) => (
//   <PopoverPrimitive.Description
//     ref={ref}
//     className={cn("text-sm text-muted-foreground", className)}
//     {...props}
//   />
// ));
// PopoverDescription.displayName = PopoverPrimitive.Description.displayName;

export {
  Popover,
  PopoverPortal,
//   PopoverOverlay,
  PopoverClose,
  PopoverTrigger,
  PopoverContent,
//   PopoverHeader,
//   PopoverFooter, 
//   PopoverTitle,
//   PopoverDescription,
};
