"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    fetch("/api/verify-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.file) {
          setDownloadUrl(data.file);
        } else {
          setError("No download found.");
        }
      })
      .catch(() => {
        setError("Verification failed.");
      });
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Thank you for your purchase 🖤</h1>

      {downloadUrl && (
        <a
          href={downloadUrl}
          download
          className="bg-white text-black px-6 py-3 rounded text-lg"
        >
          Download your file
        </a>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </main>
  );
}
