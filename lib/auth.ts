import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "resume_app_session";
const SESSION_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";
const SESSION_EMAIL = process.env.ADMIN_EMAIL ?? "admin@example.com";

export function createAuthResponse(email: string) {
  const response = NextResponse.json({ success: true, email });
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: Buffer.from(JSON.stringify({ email })).toString("base64"),
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax",
  });
  return response;
}

export function logoutResponse() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: "",
    maxAge: 0,
    path: "/",
  });
  return response;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!authCookie) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(authCookie, "base64").toString("utf-8"),
    );
    if (payload?.email === SESSION_EMAIL) {
      return { email: payload.email };
    }
  } catch {
    return null;
  }

  return null;
}

export async function verifyCredentials(email: string, password: string) {
  return email === SESSION_EMAIL && password === SESSION_PASSWORD;
}
