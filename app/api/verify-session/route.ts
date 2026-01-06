import Stripe from "stripe";
import { NextResponse } from "next/server";
import { productFiles } from "@/lib/products";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// jednoduchý in-memory store (zatím)
const downloadTokens = new Map<string, string>();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");

  if (!session_id) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items.data.price.product"],
  });

  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Payment not completed" }, { status: 403 });
  }

  const product = session.line_items?.data[0]?.price?.product;
  const productName =
    typeof product === "object" ? product.name : null;

  if (!productName || !productFiles[productName]) {
    return NextResponse.json({ error: "No product file" }, { status: 404 });
  }

  const token = crypto.randomUUID();
  downloadTokens.set(token, productFiles[productName]);

  return NextResponse.json({
    downloadUrl: `/api/download?token=${token}`,
  });
}

// export pre download route
export { downloadTokens };
