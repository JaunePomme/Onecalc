"use client";
import { useState } from "react";

const faqData = [
  {
    question: "Quelles devises puis-je convertir ?",
    answer: "Les principales devises mondiales sont disponibles (EUR, USD, GBP, CHF, JPY, etc.).",
  },
  {
    question: "Les taux sont-ils en temps réel ?",
    answer: "Les taux sont mis à jour régulièrement mais peuvent différer légèrement des taux bancaires exacts.",
  },
  {
    question: "Y a-t-il des frais inclus ?",
    answer: "Non, ce convertisseur ne prend pas en compte les éventuels frais de change de votre banque.",
  },
];

const devises = [
  { code: "EUR", label: "Euro" },
  { code: "USD", label: "Dollar US" },
  { code: "GBP", label: "Livre Sterling" },
  { code: "CHF", label: "Franc Suisse" },
  { code: "JPY", label: "Yen Japonais" },
  { code: "CAD", label: "Dollar Canadien" },
  { code: "AUD", label: "Dollar Australien" },
  { code: "CNY", label: "Yuan Chinois" },
];

async function fetchRate(from: string, to: string): Promise<number | null> {
  try {
    const res = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`);
    const data = await res.json();
    return data.rates?.[to] ?? null;
  } catch {
    return null;
  }
}

export default function ConversionDevises() {
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount.replace(",", "."));
    if (isNaN(amt) || amt <= 0) {
      setResult(null);
      setRate(null);
      return;
    }
    setLoading(true);
    const r = await fetchRate(from, to);
    setRate(r);
    setLoading(false);
    if (r !== null) {
      setResult((amt * r).toLocaleString("fr-FR", { maximumFractionDigits: 4 }));
    } else {
      setResult(null);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">
        Convertisseur de devises
      </h1>
      <p className="mb-8">
        Convertissez rapidement les principales devises mondiales avec des taux actualisés.
      </p>

      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>Disclaimer :</strong> Résultat indicatif, ne remplace pas un taux bancaire officiel.
      </div>

      <form
        onSubmit={handleConvert}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          Montant :
          <input
            type="number"
            min="0"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </label>
        <div className="flex gap-2">
          <label className="flex-1">
            De :
            <select
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
              value={from}
              onChange={e => setFrom(e.target.value)}
            >
              {devises.map(dev => (
                <option key={dev.code} value={dev.code}>{dev.code} - {dev.label}</option>
              ))}
            </select>
          </label>
          <label className="flex-1">
            Vers :
            <select
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
              value={to}
              onChange={e => setTo(e.target.value)}
            >
              {devises.map(dev => (
                <option key={dev.code} value={dev.code}>{dev.code} - {dev.label}</option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
          disabled={loading}
        >
          {loading ? "Conversion..." : "Convertir"}
        </button>
        <div className="mt-2">
          <span className="font-semibold">Résultat :</span>
          <br />
          {result !== null && rate !== null ? (
            <>
              <span className="text-lg font-bold">{result} {to}</span>
              <br />
              <span className="text-xs text-gray-500">
                1 {from} = {rate.toLocaleString("fr-FR", { maximumFractionDigits: 6 })} {to}
              </span>
            </>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">
          FAQ - Convertisseur de devises
        </h2>
        <div className="flex flex-col gap-2">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className="border rounded bg-gray-50 dark:bg-gray-900"
            >
              <button
                type="button"
                className="w-full text-left px-4 py-3 font-semibold focus:outline-none flex justify-between items-center"
                onClick={() => toggleFaq(idx)}
                aria-expanded={openFaq.includes(idx)}
                aria-controls={`faq-panel-${idx}`}
              >
                {item.question}
                <span className="ml-2">
                  {openFaq.includes(idx) ? "▲" : "▼"}
                </span>
              </button>
              {openFaq.includes(idx) && (
                <div
                  id={`faq-panel-${idx}`}
                  className="px-4 pb-4 text-gray-700 dark:text-gray-200 animate-fade-in"
                >
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}