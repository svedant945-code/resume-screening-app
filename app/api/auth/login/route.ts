import { NextRequest } from "next/server";
import { createAuthResponse, verifyCredentials } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = body.email?.toString().trim();
  const password = body.password?.toString().trim();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: "Email and password are required." }),
      { status: 400 },
    );
  }

  const verified = await verifyCredentials(email, password);
  if (!verified) {
    return new Response(JSON.stringify({ message: "Invalid credentials." }), {
      status: 401,
    });
  }

  return createAuthResponse(email);
}
