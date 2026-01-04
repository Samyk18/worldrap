"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const file = searchParams.get("file");

  if (!file) {
    return <p>No download found.</p>;
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center flex-col gap-6">
      <h1 className="text-4xl font-bold">Thank you 🖤</h1>

      <a
        href={file}
        download
        className="bg-white text-black px-6 py-3 rounded hover:bg-gray-300"
      >
        Download your file
      </a>
    </main>
  );
}
