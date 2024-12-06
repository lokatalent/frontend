"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  color?: string;
  radius?: string;
  fallback?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (props, forwardedRef) => {
    const {
      asChild,
      children,
      className,
      style,
      color,
      radius,
      fallback,
      ...imageProps
    } = props;
    const [status, setStatus] = React.useState<
      "idle" | "loading" | "loaded" | "error"
    >("idle");

    return (
      <AvatarPrimitive.Root
        data-accent-color={color}
        data-radius={radius}
        className={cn("rt-reset", "rt-AvatarRoot", className)}
        style={style}
        asChild={asChild}
      >
        {status === "idle" || status === "loading" ? (
          <span className="rt-AvatarFallback" />
        ) : null}
        {status === "error" ? (
          <AvatarPrimitive.Fallback
            className={cn("rt-AvatarFallback w-[10rem]", {
              "rt-one-letter":
                typeof fallback === "string" && fallback.length === 1,
              "rt-two-letters":
                typeof fallback === "string" && fallback.length === 2,
            })}
            delayMs={0}
          >
            {fallback}
          </AvatarPrimitive.Fallback>
        ) : null}
        <AvatarPrimitive.Image
          ref={forwardedRef}
          className="rt-AvatarImage"
          {...imageProps}
          onLoadingStatusChange={(status) => {
            imageProps.onLoadingStatusChange?.(status);
            setStatus(status);
          }}
        />
      </AvatarPrimitive.Root>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
export type { AvatarProps };
