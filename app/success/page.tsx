"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => setDownloadUrl(data.downloadUrl));
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Thank you 🖤</h1>

      {downloadUrl ? (
        <a
          href={downloadUrl}
          className="bg-white text-black px-6 py-3 rounded hover:bg-gray-300"
        >
          Download your file
        </a>
      ) : (
        <p>Preparing your download...</p>
      )}
    </main>
  );
}
