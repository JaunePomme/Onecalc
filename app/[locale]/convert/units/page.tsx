"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

const units = (t: (key: string) => string) => ({
  length: [
    { code: "m", label: t("unit_meter") },
    { code: "cm", label: t("unit_centimeter") },
    { code: "mm", label: t("unit_millimeter") },
    { code: "km", label: t("unit_kilometer") },
    { code: "in", label: t("unit_inch") },
    { code: "ft", label: t("unit_foot") },
    { code: "yd", label: t("unit_yard") },
    { code: "mi", label: t("unit_mile") },
  ],
  mass: [
    { code: "kg", label: t("unit_kilogram") },
    { code: "g", label: t("unit_gram") },
    { code: "mg", label: t("unit_milligram") },
    { code: "lb", label: t("unit_pound") },
    { code: "oz", label: t("unit_ounce") },
  ],
  volume: [
    { code: "L", label: t("unit_liter") },
    { code: "mL", label: t("unit_milliliter") },
    { code: "gal", label: t("unit_gallon") },
    { code: "qt", label: t("unit_quart") },
    { code: "pt", label: t("unit_pint") },
  ],
  temperature: [
    { code: "C", label: t("unit_celsius") },
    { code: "F", label: t("unit_fahrenheit") },
    { code: "K", label: t("unit_kelvin") },
  ],
});

function convertValue({
  category,
  from,
  to,
  value,
}: {
  category: string;
  from: string;
  to: string;
  value: number;
}): number | null {
  if (from === to) return value;
  // Longueur (tout en mètres)
  const lengthFactors: Record<string, number> = {
    m: 1,
    cm: 0.01,
    mm: 0.001,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344,
  };
  // Masse (tout en kg)
  const massFactors: Record<string, number> = {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lb: 0.45359237,
    oz: 0.0283495231,
  };
  // Volume (tout en L)
  const volumeFactors: Record<string, number> = {
    L: 1,
    mL: 0.001,
    gal: 3.785411784,
    qt: 0.946352946,
    pt: 0.473176473,
  };

  if (category === "longueur") {
    return (value * lengthFactors[from]) / lengthFactors[to];
  }
  if (category === "masse") {
    return (value * massFactors[from]) / massFactors[to];
  }
  if (category === "volume") {
    return (value * volumeFactors[from]) / volumeFactors[to];
  }
  if (category === "temperature") {
    // Température : formules spécifiques
    if (from === "C" && to === "F") return value * 9 / 5 + 32;
    if (from === "F" && to === "C") return (value - 32) * 5 / 9;
    if (from === "C" && to === "K") return value + 273.15;
    if (from === "K" && to === "C") return value - 273.15;
    if (from === "F" && to === "K") return (value - 32) * 5 / 9 + 273.15;
    if (from === "K" && to === "F") return (value - 273.15) * 9 / 5 + 32;
    return null;
  }
  return null;
}

export default function UnitsPage() {
  const t = useTranslations("Units");
  const localizedUnits = units(t);
  const [category, setCategory] = useState<keyof typeof localizedUnits>("length");
  const [from, setFrom] = useState(localizedUnits.length[0].code);
  const [to, setTo] = useState(localizedUnits.length[1].code);
  const [value, setValue] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCategoryChange = (cat: keyof typeof localizedUnits) => {
    setCategory(cat);
    setFrom(localizedUnits[cat][0].code);
    setTo(localizedUnits[cat][1].code);
    setValue("");
    setResult(null);
    setError(null);
  };

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = parseFloat(value.replace(",", "."));
    if (isNaN(v)) {
      setResult(null);
      setError(t("errorValue"));
      return;
    }
    const r = convertValue({ category, from, to, value: v });
    if (r === null || !isFinite(r)) {
      setResult(null);
      setError(t("errorConversion"));
      return;
    }
    setResult(r);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const faqData = Array.from({ length: 3 }).map((_, idx) => ({
    question: t(`faq_${idx}_question`),
    answer: t(`faq_${idx}_answer`),
  }));

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <p className="mb-8">{t("intro")}</p>
      <div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
        <strong>{t("disclaimer")}</strong>
      </div>
      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
      >
        <label>
          {t("categoryLabel")}
          <select
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value as keyof typeof units)}
          >
            <option value="longueur">{t("categoryLength")}</option>
            <option value="masse">{t("categoryMass")}</option>
            <option value="volume">{t("categoryVolume")}</option>
            <option value="temperature">{t("categoryTemperature")}</option>
          </select>
        </label>
        <div className="flex gap-2">
          <label className="flex-1">
            {t("fromLabel")}
            <select
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              {localizedUnits[category].map((u) => (
                <option key={u.code} value={u.code}>{u.label}</option>
              ))}
            </select>
          </label>
          <label className="flex-1">
            {t("toLabel")}
            <select
              className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              {localizedUnits[category].map((u) => (
                <option key={u.code} value={u.code}>{u.label}</option>
              ))}
            </select>
          </label>
        </div>
        <label>
          {t("valueLabel")}
          <input
            type="number"
            step="any"
            className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
        >
          {t("convert")}
        </button>
        <div className="mt-2">
          <span className="font-semibold">{t("resultLabel")}</span>
          <br />
          {error ? (
            <span className="text-red-600">{error}</span>
          ) : result !== null ? (
            <span className="text-lg font-bold">
              {result.toLocaleString("fr-FR", { maximumFractionDigits: 8 })}
            </span>
          ) : (
            "--"
          )}
        </div>
      </form>

      <section className="mb-6" id="faq">
        <h2 className="text-xl font-semibold mb-4">{t("faqTitle")}</h2>
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