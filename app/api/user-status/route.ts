import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "No email" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("users")
    .select("plan, extra_credits")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({
    plan: data?.plan || "free",
    extra_credits: data?.extra_credits || 0,
  });
}