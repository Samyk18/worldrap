"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const file = searchParams.get("file");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Thank you for your purchase 🖤</h1>

      {file ? (
        <a
          href={file}
          download
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
