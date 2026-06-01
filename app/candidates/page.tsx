"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface CandidateRow {
  id: string;
  resume: {
    name: string;
    email: string;
    phone: string;
    skills: string[];
  };
  score: number;
  rank: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<CandidateRow[]>([]);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState("10");
  const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc");

  useEffect(() => {
    fetch("/api/score").then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setCandidates(data.scores || []);
      }
    });
  }, []);

  const filtered = useMemo(() => {
    const normalizedQuery = query.toLowerCase();
    const rows = candidates.filter((candidate) =>
      candidate.resume.name.toLowerCase().includes(normalizedQuery),
    );
    return rows
      .sort((a, b) =>
        sortDirection === "desc" ? b.score - a.score : a.score - b.score,
      )
      .slice(0, Number(limit));
  }, [candidates, query, sortDirection, limit]);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-14 lg:px-10">
      <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-10 shadow-soft">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
              Candidate Rankings
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-white">
              Ranked candidate pool
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Input
              placeholder="Search by name"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <select
              className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100"
              value={limit}
              onChange={(event) => setLimit(event.target.value)}
            >
              <option value="5">Top 5</option>
              <option value="10">Top 10</option>
              <option value="25">Top 25</option>
            </select>
            <Button
              variant="secondary"
              onClick={() =>
                setSortDirection(sortDirection === "desc" ? "asc" : "desc")
              }
            >
              Sort {sortDirection === "desc" ? "Descending" : "Ascending"}
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-800">
          <Table>
            <TableHeader>
              <tr>
                <TableHeadCell>Rank</TableHeadCell>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Score</TableHeadCell>
                <TableHeadCell>Matched Skills</TableHeadCell>
                <TableHeadCell>Missing Skills</TableHeadCell>
              </tr>
            </TableHeader>
            <TableBody>
              {filtered.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="border-b border-slate-800 last:border-0"
                >
                  <TableCell>{candidate.rank}</TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-100">
                      {candidate.resume.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {candidate.resume.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={candidate.score > 75 ? "success" : "default"}
                    >
                      {candidate.score.toFixed(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {candidate.matchedSkills.slice(0, 3).join(", ") || "None"}
                  </TableCell>
                  <TableCell>
                    {candidate.missingSkills.slice(0, 3).join(", ") || "None"}
                  </TableCell>
                </tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
