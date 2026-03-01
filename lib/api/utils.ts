import { NextResponse } from "next/server";
import { auth } from "@/auth";

export function json<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function error(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function getSession() {
  const session = await auth();
  return session;
}

// Default workspace + user for demo mode
export const WORKSPACE_ID = "ws-001";
export const DEMO_USER_ID = "demo-user-001";
