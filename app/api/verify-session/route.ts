import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const { sessionId } = await req.json();

  if (!sessionId) {
    return NextResponse.json({ error: "No session id" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const file = session.metadata?.file;

  if (!file) {
    return NextResponse.json({ error: "No file found" }, { status: 404 });
  }

  return NextResponse.json({ file });
}
