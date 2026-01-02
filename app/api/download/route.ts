import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import fs from "fs";
import path from "path";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  const file = req.nextUrl.searchParams.get("file");

  if (!sessionId || !file) {
    return new NextResponse("Missing parameters", { status: 400 });
  }

  // Over Stripe session
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return new NextResponse("Payment not verified", { status: 403 });
  }

  const filePath = path.join(process.cwd(), "protected-files", file);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${file}"`,
    },
  });
}
