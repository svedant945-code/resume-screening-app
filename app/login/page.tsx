"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const result = await response.json();
    setIsSubmitting(false);

    if (response.ok) {
      toast.success("Logged in successfully");
      router.push("/dashboard");
      return;
    }

    toast.error(result?.message || "Unable to login");
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-14 lg:px-10">
      <div className="w-full rounded-[2rem] border border-slate-800 bg-slate-950/90 p-10 shadow-soft">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
            Admin Access
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            HR Dashboard Login
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Sign in to manage candidate screening, resume uploads, and job
            descriptions.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              {...register("email", { required: true })}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              {...register("password", { required: true })}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </main>
  );
}
