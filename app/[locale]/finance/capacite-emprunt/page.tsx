"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Emprunt() {
  const t = useTranslations("CapaciteEmprunt");
  const faqData = [0, 1, 2, 3, 4].map((idx) => ({
    question: t(`faq_${idx}_question`),
    answer: t(`faq_${idx}_answer`),
  }));

  const [revenus, setRevenus] = useState("");
  const [charges, setCharges] = useState("");
  const [tauxEndettement, setTauxEndettement] = useState("35");
  const [tauxAnnuel, setTauxAnnuel] = useState("");
  const [duree, setDuree] = useState("");
  const [assurance, setAssurance] = useState("");
  const [mensualiteMax, setMensualiteMax] = useState<null | number>(null);
  const [capitalMax, setCapitalMax] = useState<null | number>(null);
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const R = parseFloat(revenus.replace(",", "."));
    const C = parseFloat(charges.replace(",", "."));
    const p = parseFloat(tauxEndettement.replace(",", ".")) / 100;
    const tAnn = parseFloat(tauxAnnuel.replace(",", ".")) / 100;
    const n = parseFloat(duree.replace(",", ".")) * 12;
    const a = parseFloat(assurance.replace(",", ".")) || 0;

    if (
      !isNaN(R) &&
      !isNaN(C) &&
      !isNaN(p) &&
      !isNaN(tAnn) &&
      !isNaN(n) &&
      n > 0
    ) {
      // Mensualité max
      const Mmax = R * p - C - a;
      setMensualiteMax(Mmax > 0 ? Mmax : 0);

      // Taux mensuel
      const r = tAnn / 12;
      let Pmax = 0;
      if (r > 0) {
        Pmax = (Mmax * (1 - Math.pow(1 + r, -n))) / r;
      } else {
        Pmax = Mmax * n;
      }
      setCapitalMax(Pmax > 0 ? Pmax : 0);
    } else {
      setMensualiteMax(null);
      setCapitalMax(null);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  return (
    <main
      className="max-w-2xl mx-auto py-12 px-4 sm:px-8"
      role="main"
      aria-label={t("title")}
    >
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <p className="mb-8">{t("intro")}</p>

      <div
        className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800"
        role="note"
        aria-live="polite"
      >
        <strong>Disclaimer :</strong> {t("disclaimer")}
      </div>

      <form
        onSubmit={handleCalc}
        className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
        aria-labelledby="cap-form-title"
        aria-describedby="cap-intro cap-disclaimer"
        role="form"
        autoComplete="off"
      >
        <h2 id="cap-form-title" className="sr-only">
          {t("title")}
        </h2>
        <label htmlFor="revenus-input" className="font-semibold">
          {t("revenusLabel")}
        </label>
        <input
          id="revenus-input"
          name="revenus"
          type="number"
          min="0"
          step="any"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={revenus}
          onChange={(e) => setRevenus(e.target.value)}
          required
          aria-required="true"
          aria-label={t("revenusLabel")}
        />
        <label htmlFor="charges-input" className="font-semibold">
          {t("chargesLabel")}
        </label>
        <input
          id="charges-input"
          name="charges"
          type="number"
          min="0"
          step="any"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={charges}
          onChange={(e) => setCharges(e.target.value)}
          required
          aria-required="true"
          aria-label={t("chargesLabel")}
        />
        <label htmlFor="taux-endettement-input" className="font-semibold">
          {t("tauxEndettementLabel")}
        </label>
        <input
          id="taux-endettement-input"
          name="taux-endettement"
          type="number"
          min="0"
          max="100"
          step="any"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={tauxEndettement}
          onChange={(e) => setTauxEndettement(e.target.value)}
          required
          aria-required="true"
          aria-label={t("tauxEndettementLabel")}
        />
        <label htmlFor="taux-annuel-input" className="font-semibold">
          {t("tauxAnnuelLabel")}
        </label>
        <input
          id="taux-annuel-input"
          name="taux-annuel"
          type="number"
          min="0"
          step="any"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={tauxAnnuel}
          onChange={(e) => setTauxAnnuel(e.target.value)}
          required
          aria-required="true"
          aria-label={t("tauxAnnuelLabel")}
        />
        <label htmlFor="duree-input" className="font-semibold">
          {t("dureeLabel")}
        </label>
        <input
          id="duree-input"
          name="duree"
          type="number"
          min="1"
          step="any"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={duree}
          onChange={(e) => setDuree(e.target.value)}
          required
          aria-required="true"
          aria-label={t("dureeLabel")}
        />
        <label htmlFor="assurance-input" className="font-semibold">
          {t("assuranceLabel")}
        </label>
        <input
          id="assurance-input"
          name="assurance"
          type="number"
          min="0"
          step="any"
          className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
          value={assurance}
          onChange={(e) => setAssurance(e.target.value)}
          aria-label={t("assuranceLabel")}
        />
        <div className="text-xs text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
          {t("indicative")}{" "}
          <a
            href="#faq"
            className="underline"
            aria-label={t("learnMore") + " FAQ"}
          >
            {t("learnMore")}
          </a>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
          aria-label={t("calculer")}
        >
          {t("calculer")}
        </button>
        <div className="mt-2">
          <span className="font-semibold">{t("resultLabel")}</span>
          <br />
          {t("mensualiteMaxLabel")}{" "}
          <span className="text-lg font-bold">
            {mensualiteMax !== null
              ? `${mensualiteMax.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })} €`
              : "-- €"}
          </span>
          <br />
          {t("capitalMaxLabel")}{" "}
          <span className="text-lg font-bold">
            {capitalMax !== null
              ? `${capitalMax.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })} €`
              : "-- €"}
          </span>
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("howTitle")}</h2>
        <p>{t("howDesc")}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t("formulaTitle")}</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          {t("formula1")}
          <br />
          {t("formula2")}
          <br />
          {t("formula3")}
        </div>
        <p>{t("example1")}</p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
          {t("example2")}
          <br />
          {t("example3")}
          <br />
          {t("example4")}
        </div>
        <p>{t("example5")}</p>
      </section>

      <section
        className="mb-6"
        id="faq"
        aria-labelledby="faq-title"
        role="region"
      >
        <h2 className="text-xl font-semibold mb-4" id="faq-title">
          {t("faqTitle")}
        </h2>
        <div className="flex flex-col gap-2">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className="border rounded bg-gray-50 dark:bg-gray-900"
              role="group"
              aria-labelledby={`faq-question-${idx}`}
            >
              <button
                type="button"
                className="w-full text-left px-4 py-3 font-semibold focus:outline-none flex justify-between items-center"
                onClick={() => toggleFaq(idx)}
                aria-expanded={openFaq.includes(idx)}
                aria-controls={`faq-panel-${idx}`}
                id={`faq-question-${idx}`}
                aria-label={item.question}
              >
                {item.question}
                <span className="ml-2" aria-hidden="true">
                  {openFaq.includes(idx) ? "▲" : "▼"}
                </span>
              </button>
              {openFaq.includes(idx) && (
                <div
                  id={`faq-panel-${idx}`}
                  className="px-4 pb-4 text-gray-700 dark:text-gray-200 animate-fade-in"
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  tabIndex={0}
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
