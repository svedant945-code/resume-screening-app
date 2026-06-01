import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-14 lg:px-10">
      <div className="grid gap-10 rounded-[2rem] border border-slate-800 bg-slate-950/90 p-12 shadow-soft">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
            Resume Screening
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            Intelligent candidate ranking for modern HR teams.
          </h1>
          <p className="max-w-2xl text-lg text-slate-400">
            Upload resumes, capture job descriptions, and automatically rank
            candidates with a weighted scoring algorithm.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/login">
            <Button>Get started</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary">View demo dashboard</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
