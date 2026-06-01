import Link from "next/link";
import {
  Home,
  Upload,
  FileText,
  BarChart3,
  LogIn,
  UserCheck,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Upload", href: "/upload", icon: Upload },
  { label: "Job Description", href: "/job-description", icon: FileText },
  { label: "Candidates", href: "/candidates", icon: UserCheck },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
];

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-slate-800 bg-slate-950 p-6 lg:block">
      <div className="mb-10">
        <div className="mb-2 text-sm uppercase tracking-[0.3em] text-slate-500">
          HR Suite
        </div>
        <h1 className="text-2xl font-semibold text-slate-100">ResumeRank</h1>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
