import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Webhook signature error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session.customer_details?.email;

    if (!email) {
      return NextResponse.json({ error: "No email" }, { status: 400 });
    }

    if (session.mode === "subscription") {
      const { error } = await supabaseAdmin.from("users").upsert(
        {
          email,
          plan: "pro",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );

      if (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
    }

    if (session.mode === "payment") {
      const { data: user, error: selectError } = await supabaseAdmin
        .from("users")
        .select("extra_credits")
        .eq("email", email)
        .single();

      if (selectError && selectError.code !== "PGRST116") {
        return NextResponse.json({ error: selectError }, { status: 500 });
      }

      const currentCredits = user?.extra_credits || 0;

      const { error } = await supabaseAdmin.from("users").upsert(
        {
          email,
          plan: "free",
          extra_credits: currentCredits + 10,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );

      if (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}