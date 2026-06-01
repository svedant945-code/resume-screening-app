import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "success" | "warning";
}

export function Badge({
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
        variant === "default" && "bg-slate-800 text-slate-200",
        variant === "outline" && "border border-slate-700 text-slate-200",
        variant === "success" && "bg-emerald-500/15 text-emerald-300",
        variant === "warning" && "bg-amber-500/15 text-amber-300",
        className,
      )}
      {...props}
    />
  );
}
