import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { StatCard } from "@/components/layout/stat-card";

async function getDashboardStats() {
  const totalResumes = await prisma.resume.count();
  const totalJds = await prisma.jobDescription.count();
  const totalCandidates = await prisma.candidateScore.count();
  const topCandidates = await prisma.candidateScore.findMany({
    take: 3,
    orderBy: { score: "desc" },
    include: { resume: true },
  });

  return { totalResumes, totalJds, totalCandidates, topCandidates };
}

async function getCurrentUser() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("resume_app_session")?.value;
  if (!authCookie) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(authCookie, "base64").toString("utf-8"),
    );
    return payload?.email ? { email: payload.email } : null;
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const { totalResumes, totalJds, totalCandidates, topCandidates } =
    await getDashboardStats();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="lg:flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <Topbar />
          <div className="mt-8 grid gap-6 xl:grid-cols-3">
            <StatCard
              title="Resumes"
              value={String(totalResumes)}
              description="Total uploaded resumes"
            />
            <StatCard
              title="Job Descriptions"
              value={String(totalJds)}
              description="Currently stored JDs"
              variant="secondary"
            />
            <StatCard
              title="Ranked Candidates"
              value={String(totalCandidates)}
              description="Candidates scored and ranked"
            />
          </div>
          <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-950/90 p-8 shadow-soft">
            <h2 className="text-xl font-semibold text-white">Top Candidates</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {topCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
                >
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                    Rank {candidate.rank}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    {candidate.resume.name}
                  </h3>
                  <p className="mt-2 text-slate-400">
                    Score: {candidate.score.toFixed(1)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {candidate.matchedSkills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
