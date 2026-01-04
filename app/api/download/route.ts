import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");

  if (!file) {
    return new NextResponse("Missing file", { status: 400 });
  }

  const filePath = path.join(process.cwd(), "private_downloads", file);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  const buffer = fs.readFileSync(filePath);

  return new NextResponse(buffer, {
    headers: {
      "Content-Disposition": `attachment; filename="${file}"`,
      "Content-Type": "application/octet-stream",
    },
  });
}
