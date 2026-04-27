import { supabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("users")
    .insert([
      {
        email: "test@example.com",
        plan: "free",
        extra_credits: 3,
      },
    ])
    .select();

  if (error) {
    return NextResponse.json({ error });
  }

  return NextResponse.json({ data });
}