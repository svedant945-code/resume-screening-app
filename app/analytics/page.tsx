"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardStats {
  averageScore: number;
  topCandidates: Array<{ name: string; score: number }>;
  skillDistribution: Array<{ skill: string; count: number }>;
  missingSkills: Array<{ skill: string; count: number }>;
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fetch("/api/score").then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        const items = data.scores || [];
        const averageScore = items.length
          ? items.reduce(
              (sum: number, candidate: any) => sum + candidate.score,
              0,
            ) / items.length
          : 0;
        const topCandidates = items
          .slice(0, 5)
          .map((candidate: any) => ({
            name: candidate.resume.name,
            score: candidate.score,
          }));
        const skills: Record<string, number> = {};
        const missing: Record<string, number> = {};
        items.forEach((candidate: any) => {
          candidate.resume.skills.forEach((skill: string) => {
            skills[skill] = (skills[skill] || 0) + 1;
          });
          candidate.missingSkills.forEach((skill: string) => {
            missing[skill] = (missing[skill] || 0) + 1;
          });
        });

        setStats({
          averageScore,
          topCandidates,
          skillDistribution: Object.entries(skills)
            .map(([skill, count]) => ({ skill, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 6),
          missingSkills: Object.entries(missing)
            .map(([skill, count]) => ({ skill, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 6),
        });
      }
    });
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-14 lg:px-10">
      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-8">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-10 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
                  Analytics
                </p>
                <h1 className="mt-3 text-4xl font-semibold text-white">
                  Candidate insights
                </h1>
              </div>
              <Button variant="secondary">Export report</Button>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Average Match Score</CardTitle>
                </CardHeader>
                <CardDescription>
                  {stats
                    ? `${stats.averageScore.toFixed(1)} / 100`
                    : "Loading..."}
                </CardDescription>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Top Candidate</CardTitle>
                </CardHeader>
                <CardDescription>
                  {stats?.topCandidates?.[0]?.name ?? "No data yet"}
                </CardDescription>
              </Card>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Top Candidates</CardTitle>
            </CardHeader>
            <div className="mt-6 space-y-4">
              {stats?.topCandidates.map((candidate) => (
                <div
                  key={candidate.name}
                  className="rounded-3xl border border-slate-800 bg-slate-900 p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-100">
                        {candidate.name}
                      </p>
                      <p className="text-sm text-slate-500">Match score</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                      {candidate.score.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
        <section className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills Distribution</CardTitle>
            </CardHeader>
            <div className="mt-6 space-y-3">
              {stats?.skillDistribution.map((skill) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>{skill.skill}</span>
                    <span>{skill.count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-900">
                    <div
                      className="h-full rounded-full bg-sky-500"
                      style={{ width: `${Math.min(skill.count * 10, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Missing Skills</CardTitle>
            </CardHeader>
            <div className="mt-6 space-y-3">
              {stats?.missingSkills.map((skill) => (
                <div
                  key={skill.skill}
                  className="rounded-3xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-200"
                >
                  <div className="flex items-center justify-between">
                    <span>{skill.skill}</span>
                    <span>{skill.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
