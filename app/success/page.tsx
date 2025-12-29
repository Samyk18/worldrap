"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const file = searchParams.get("file");

  useEffect(() => {
    if (file) {
      window.location.href = file;
    }
  }, [file]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center gap-4">
      <h1 className="text-4xl font-bold">Payment successful 🖤</h1>
      <p>Your download should start automatically.</p>
      {file && (
        <a
          href={file}
          className="underline text-gray-300 hover:text-white"
        >
          Click here if it doesn’t
        </a>
      )}
    </main>
  );
}
