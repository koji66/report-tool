import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function findUser(email: string) {
  const { data } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  return data;
}

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

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const email = session.customer_details?.email;

  if (!email) {
    return NextResponse.json({ error: "No email" }, { status: 400 });
  }

  const user = await findUser(email);

  if (session.mode === "subscription") {
    if (user) {
      await supabaseAdmin
        .from("users")
        .update({
          plan: "pro",
          updated_at: new Date().toISOString(),
        })
        .eq("email", email);
    } else {
      await supabaseAdmin.from("users").insert({
        email,
        plan: "pro",
        extra_credits: 0,
      });
    }
  }

  if (session.mode === "payment") {
    const currentCredits = user?.extra_credits || 0;

    if (user) {
      await supabaseAdmin
        .from("users")
        .update({
          extra_credits: currentCredits + 10,
          updated_at: new Date().toISOString(),
        })
        .eq("email", email);
    } else {
      await supabaseAdmin.from("users").insert({
        email,
        plan: "free",
        extra_credits: 10,
      });
    }
  }

  return NextResponse.json({ received: true });
}