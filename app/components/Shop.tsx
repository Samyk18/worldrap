"use client";

const products = [
  {
    name: "Starter Rap Presets",
    price: 9,
    file: "/downloads/starter-presets.zip",
  },
  {
    name: "Rap Preset Pack Vol.1",
    price: 25,
    file: "/downloads/rap-pack-vol1.zip",
  },
  {
    name: "Rap Blueprint (PDF)",
    price: 49,
    file: "/downloads/rap-blueprint.pdf",
  },
];

export default function Shop() {
  const handleBuy = async (product: any) => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // 👈 PRESMEROVANIE NA STRIPE
    } else {
      alert("Stripe checkout URL not found");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-10">
      <h1 className="text-6xl font-bold tracking-widest">WORLD RAP</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.name}
            className="border border-gray-700 rounded-xl p-6 w-72 text-center"
          >
            <h2 className="text-xl mb-4">{p.name}</h2>
            <p className="text-2xl mb-6">${p.price}</p>

            <button
              onClick={() => handleBuy(p)}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
            >
              Buy & Download
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
