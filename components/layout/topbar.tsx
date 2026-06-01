import Link from "next/link";
import { LogOut, Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-slate-400">Welcome back, HR Admin</p>
        <h2 className="text-2xl font-semibold text-slate-100">
          Candidate Ranking Dashboard
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative inline-flex items-center rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-400">
          <Search className="mr-2 h-4 w-4" />
          <input
            placeholder="Search candidates"
            className="w-full bg-transparent text-sm text-slate-100 outline-none"
          />
        </div>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Link>
      </div>
    </header>
  );
}
