"use client";

import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

export default function SuccessPage() {
  const searchParams = useSearchParams();

  const file = searchParams.get("file");
  const sessionId = searchParams.get("session_id");

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Thank you for your purchase 🖤</h1>

      {file && sessionId ? (
        <a
          href={`/api/download?session_id=${sessionId}&file=${encodeURIComponent(
            file
          )}`}
          className="bg-white text-black px-6 py-3 rounded hover:bg-gray-300"
        >
          Download your file
        </a>
      ) : (
        <p>No download found.</p>
      )}
    </main>
  );
}
