import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-6 py-14">
      <div className="w-full max-w-xl rounded-[2rem] border border-slate-800 bg-slate-950/90 p-12 text-center shadow-soft">
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
          404 Error
        </p>
        <h1 className="mt-6 text-5xl font-semibold text-white">
          Page not found
        </h1>
        <p className="mt-4 text-slate-400">
          The route you are looking for does not exist or requires
          authentication.
        </p>
        <Link href="/login">
          <Button className="mt-8">Return to login</Button>
        </Link>
      </div>
    </main>
  );
}
