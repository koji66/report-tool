import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: "メールアドレスが必要です" }, { status: 400 });
    }

    const customers = await stripe.customers.list({
      email,
      limit: 1,
    });

    if (!customers.data.length) {
      return Response.json(
        { error: "このメールアドレスの契約が見つかりません" },
        { status: 404 }
      );
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customers.data[0].id,
      return_url: "https://structify.link",
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "解約ページの作成に失敗しました" },
      { status: 500 }
    );
  }
}