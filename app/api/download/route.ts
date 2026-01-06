import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { downloadTokens } from "../verify-session/route";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token || !downloadTokens.has(token)) {
    return new NextResponse("Invalid or expired token", { status: 403 });
  }

  const fileName = downloadTokens.get(token)!;
  downloadTokens.delete(token); // 🔥 JEDNORAZOVÝ LINK

  const filePath = path.join(process.cwd(), "protected-files", fileName);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
