"use client";

import { useState, DragEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface UploadFormValues {
  jobTitle: string;
  jobDescription: string;
}

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { register, handleSubmit, reset } = useForm<UploadFormValues>();

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const dropped = Array.from(event.dataTransfer.files).filter((file) =>
      /pdf|docx?|txt/i.test(file.name),
    );
    setFiles((current) => [...current, ...dropped]);
  };

  const onSubmit = async (values: UploadFormValues) => {
    if (!files.length) {
      toast.error("Please add at least one resume file.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("resumes", file));
    formData.append("title", values.jobTitle);
    formData.append("description", values.jobDescription);

    setIsUploading(true);
    const response = await fetch("/api/resumes", {
      method: "POST",
      body: formData,
    });
    setIsUploading(false);

    if (response.ok) {
      toast.success("Resumes uploaded and indexed successfully");
      setFiles([]);
      reset();
      return;
    }

    toast.error("Upload failed, please try again.");
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl px-6 py-14 lg:px-10">
      <div className="w-full rounded-[2rem] border border-slate-800 bg-slate-950/90 p-10 shadow-soft">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
            Resume Upload
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            Upload candidate resumes
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Drag and drop PDFs, DOCs, or DOCXs and attach the matching job
            description.
          </p>
        </div>
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              placeholder="Senior Product Manager"
              {...register("jobTitle", { required: true })}
            />
          </div>
          <div>
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              placeholder="Enter the full job description here"
              {...register("jobDescription", { required: true })}
            />
          </div>
          <div
            onDrop={onDrop}
            onDragOver={(event) => event.preventDefault()}
            className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/70 p-10 text-center text-slate-400 transition hover:border-slate-500"
          >
            <p className="text-lg font-medium text-slate-100">
              Drag & drop resume files here
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Supported formats: PDF, DOC, DOCX
            </p>
            <Input
              type="file"
              className="mt-6"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={(event) =>
                setFiles(Array.from(event.target.files || []))
              }
            />
          </div>
          {files.length > 0 && (
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
              <h2 className="text-base font-semibold text-slate-100">
                Files ready to upload
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {files.map((file) => (
                  <li
                    key={file.name}
                    className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3"
                  >
                    {file.name} · {(file.size / 1024).toFixed(2)} KB
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Button type="submit" disabled={isUploading}>
            {isUploading ? "Analyzing…" : "Upload and Analyze"}
          </Button>
        </form>
      </div>
    </main>
  );
}
