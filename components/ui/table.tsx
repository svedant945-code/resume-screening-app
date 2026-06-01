import * as React from "react";
import { cn } from "@/lib/utils";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export function Table({ className, ...props }: TableProps) {
  return (
    <table
      className={cn("min-w-full divide-y divide-slate-700", className)}
      {...props}
    />
  );
}

type TableHeaderProps = React.ComponentPropsWithoutRef<"thead">;
type TableBodyProps = React.ComponentPropsWithoutRef<"tbody">;

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead className={cn("bg-slate-950", className)} {...props} />;
}

export function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody className={cn("divide-y divide-slate-800", className)} {...props} />
  );
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}
export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      className={cn("px-4 py-3 text-sm text-slate-100", className)}
      {...props}
    />
  );
}

interface TableHeadCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}
export function TableHeadCell({ className, ...props }: TableHeadCellProps) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400",
        className,
      )}
      {...props}
    />
  );
}
