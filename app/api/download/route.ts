import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");

  if (!file) {
    return new NextResponse("Missing file", { status: 400 });
  }

  // Bezpečné spracovanie názvu súboru
  const fileName = path.basename(file);
  const filePath = path.join(process.cwd(), "private_downloads", fileName);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  // Tu pridaj overenie platby / tokenu
  const paid = true; // <-- zmeň na reálne overenie
  if (!paid) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const buffer = fs.readFileSync(filePath);

  return new NextResponse(buffer, {
    headers: {
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Type": "application/octet-stream",
    },
  });
}
