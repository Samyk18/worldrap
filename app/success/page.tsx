export const dynamic = "force-dynamic";

type Props = {
  searchParams: {
    file?: string;
  };
};

export default function SuccessPage({ searchParams }: Props) {
  const file = searchParams.file;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Thank you for your purchase 🖤</h1>

      {file ? (
        <a
          href={file}
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
