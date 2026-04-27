import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  // ■ サブスク成功
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const email = session.customer_details?.email;

    if (!email) return NextResponse.json({ error: "No email" });

    // ■ プラン更新
    await supabaseAdmin
      .from("users")
      .update({ plan: "pro" })
      .eq("email", email);
  }

  // ■ 追加購入
  if (event.type === "payment_intent.succeeded") {
    const payment = event.data.object as any;

    const email = payment.receipt_email;

    if (!email) return NextResponse.json({ error: "No email" });

    // ■ クレジット加算
    const { data } = await supabaseAdmin
      .from("users")
      .select("extra_credits")
      .eq("email", email)
      .single();

    await supabaseAdmin
      .from("users")
      .update({
        extra_credits: (data?.extra_credits || 0) + 10,
      })
      .eq("email", email);
  }

  return NextResponse.json({ received: true });
}