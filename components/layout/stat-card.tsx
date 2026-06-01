import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  variant?: "primary" | "secondary";
}

export function StatCard({
  title,
  value,
  description,
  variant = "primary",
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-800 p-6 shadow-soft",
        variant === "secondary" && "bg-slate-950/80",
      )}
    >
      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
        {title}
      </p>
      <h3 className="mt-3 text-3xl font-semibold text-slate-100">{value}</h3>
      <p className="mt-3 text-sm text-slate-400">{description}</p>
    </div>
  );
}
