import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const { sessionId } = await req.json();

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Not paid" }, { status: 403 });
  }

  const fileMap: Record<string, string> = {
    "Starter Rap Presets": "/downloads/starter-presets.zip",
    "Rap Preset Pack Vol.1": "/downloads/rap-pack-vol1.zip",
    "Rap Blueprint (PDF)": "/downloads/rap-blueprint.pdf",
  };

  // Tu je oprava:
  const productName =
    session.line_items?.data[0]?.price?.product_data?.name;

  if (!productName || !fileMap[productName]) {
    return NextResponse.json({ error: "No download found" }, { status: 404 });
  }

  return NextResponse.json({
    file: fileMap[productName],
  });
}
