"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface JobDescription {
  id: string;
  title: string;
  description: string;
}

interface FormValues {
  title: string;
  description: string;
}

export default function JobDescriptionPage() {
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormValues>();

  useEffect(() => {
    fetch("/api/job-description").then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setJobDescriptions(data.jobDescriptions || []);
      }
    });
  }, []);

  const onSubmit = async (values: FormValues) => {
    setIsSaving(true);
    const response = await fetch("/api/job-description", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setIsSaving(false);

    if (response.ok) {
      toast.success("Job description saved successfully");
      reset();
      const fresh = await response.json();
      setJobDescriptions((prev) => [fresh.jobDescription, ...prev]);
      return;
    }

    toast.error("Unable to save job description");
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl px-6 py-14 lg:px-10">
      <div className="grid w-full gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-10 shadow-soft">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
            Job Description
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            Save the hiring brief
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Store job descriptions and use them to score candidate resumes.
          </p>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="title">Job title</Label>
              <Input
                id="title"
                placeholder="Senior Product Designer"
                {...register("title", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter job description text"
                {...register("description", { required: true })}
              />
            </div>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving…" : "Save JD"}
            </Button>
          </form>
        </div>
        <div className="space-y-4">
          {jobDescriptions.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
              </CardHeader>
              <CardDescription>
                {job.description.slice(0, 120)}...
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
