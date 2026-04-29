import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "No email" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("users")
    .select("extra_credits")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const current = data?.extra_credits || 0;

  if (current <= 0) {
    return NextResponse.json({ error: "No credits" }, { status: 400 });
  }

  const { error: updateError } = await supabaseAdmin
    .from("users")
    .update({
      extra_credits: current - 1,
      updated_at: new Date().toISOString(),
    })
    .eq("email", email);

  if (updateError) {
    return NextResponse.json({ error: updateError }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}