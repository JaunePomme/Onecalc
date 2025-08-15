"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

function simulateDCA({
	montant,
	prixInitial,
	prixFinal,
	periodes,
}: {
	montant: number;
	prixInitial: number;
	prixFinal: number;
	periodes: number;
}) {
	// Simulation linéaire du prix entre initial et final
	let totalInvesti = 0;
	let totalActif = 0;
	for (let i = 0; i < periodes; i++) {
		const prix =
			prixInitial + ((prixFinal - prixInitial) * i) / (periodes - 1);
		totalInvesti += montant;
		totalActif += montant / prix;
	}
	const prixMoyen = totalInvesti / totalActif;
	const valeurFinale = totalActif * prixFinal;
	const perf = valeurFinale - totalInvesti;
	const perfPct = (perf / totalInvesti) * 100;
	return {
		totalInvesti,
		totalActif,
		prixMoyen,
		valeurFinale,
		perf,
		perfPct,
	};
}

export default function DcaPage() {
	const t = useTranslations("DCA");
	const [montant, setMontant] = useState("");
	const [prixInitial, setPrixInitial] = useState("");
	const [prixFinal, setPrixFinal] = useState("");
	const [periodes, setPeriodes] = useState("");
	const [result, setResult] = useState<ReturnType<typeof simulateDCA> | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [openFaq, setOpenFaq] = useState<number[]>([]);

	const faqData = Array.from({ length: 4 }).map((_, idx) => ({
		question: t(`faq_${idx}_question`),
		answer: t(`faq_${idx}_answer`)
	}));

	const handleCalc = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		const m = parseFloat(montant.replace(",", "."));
		const pi = parseFloat(prixInitial.replace(",", "."));
		const pf = parseFloat(prixFinal.replace(",", "."));
		const n = parseInt(periodes, 10);
		if (isNaN(m) || m <= 0) {
			setResult(null);
			setError(t("errorAmount"));
			return;
		}
		if (isNaN(pi) || pi <= 0) {
			setResult(null);
			setError(t("errorPrixInitial"));
			return;
		}
		if (isNaN(pf) || pf <= 0) {
			setResult(null);
			setError(t("errorPrixFinal"));
			return;
		}
		if (isNaN(n) || n < 2) {
			setResult(null);
			setError(t("errorPeriodes"));
			return;
		}
		setResult(simulateDCA({ montant: m, prixInitial: pi, prixFinal: pf, periodes: n }));
	};

	const toggleFaq = (idx: number) => {
		setOpenFaq((prev) =>
			prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
		);
	};

	return (
		<main className="max-w-2xl mx-auto py-12 px-4 sm:px-8" role="main" aria-label={t("title") + ' - ' + t("intro")}> 
			<h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
			<p className="mb-8">{t("intro")}</p>

			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800" role="note" aria-live="polite">
				<strong>Disclaimer :</strong> {t("disclaimer")}
			</div>

			<form
				onSubmit={handleCalc}
				className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
				aria-labelledby="dca-form-title"
				aria-describedby="dca-intro dca-disclaimer"
				role="form"
				autoComplete="off"
			>
				<h2 id="dca-form-title" className="sr-only">{t("title")}</h2>
				<label htmlFor="amount-input" className="font-semibold">
					{t("amountLabel")}
				</label>
				<input
					id="amount-input"
					name="amount"
					type="number"
					min="0"
					step="any"
					className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
					value={montant}
					onChange={e => setMontant(e.target.value)}
					required
					aria-required="true"
					aria-label={t("amountLabel")}
				/>
				<label htmlFor="prix-initial-input" className="font-semibold">
					{t("prixInitialLabel")}
				</label>
				<input
					id="prix-initial-input"
					name="prixInitial"
					type="number"
					min="0"
					step="any"
					className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
					value={prixInitial}
					onChange={e => setPrixInitial(e.target.value)}
					required
					aria-required="true"
					aria-label={t("prixInitialLabel")}
				/>
				<label htmlFor="prix-final-input" className="font-semibold">
					{t("prixFinalLabel")}
				</label>
				<input
					id="prix-final-input"
					name="prixFinal"
					type="number"
					min="0"
					step="any"
					className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
					value={prixFinal}
					onChange={e => setPrixFinal(e.target.value)}
					required
					aria-required="true"
					aria-label={t("prixFinalLabel")}
				/>
				<label htmlFor="periodes-input" className="font-semibold">
					{t("periodesLabel")}
				</label>
				<input
					id="periodes-input"
					name="periodes"
					type="number"
					min="2"
					step="1"
					className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
					value={periodes}
					onChange={e => setPeriodes(e.target.value)}
					required
					aria-required="true"
					aria-label={t("periodesLabel")}
				/>
				<button
					type="submit"
					className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
					aria-label={t("calculate")}
				>
					{t("calculate")}
				</button>
				<div className="mt-2" aria-live="polite" aria-atomic="true">
					<span className="font-semibold">{t("resultLabel")}</span>
					<br />
					{error ? (
						<span className="text-red-600">{error}</span>
					) : result ? (
						<>
							<span className="text-lg font-bold">
								{t("totalInvestiLabel")} {result.totalInvesti.toLocaleString(undefined, { maximumFractionDigits: 2 })} €
							</span>
							<br />
							<span className="text-lg font-bold">
								{t("prixMoyenLabel")} {result.prixMoyen.toLocaleString(undefined, { maximumFractionDigits: 4 })} €
							</span>
							<br />
							<span className="text-lg font-bold">
								{t("valeurFinaleLabel")} {result.valeurFinale.toLocaleString(undefined, { maximumFractionDigits: 2 })} €
							</span>
							<br />
							<span className="text-lg font-bold">
								{t("perfLabel")} {result.perf.toLocaleString(undefined, { maximumFractionDigits: 2 })} €
							</span>
							<br />
							<span className="text-lg font-bold">
								{t("perfPctLabel")} {result.perfPct.toLocaleString(undefined, { maximumFractionDigits: 2 })} %
							</span>
						</>
					) : (
						"--"
					)}
				</div>
			</form>

			<section className="mb-6" id="faq" aria-labelledby="faq-title" role="region">
				<h2 className="text-xl font-semibold mb-4" id="faq-title">{t("faqTitle")}</h2>
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
								<span className="ml-2" aria-hidden="true">{openFaq.includes(idx) ? "▲" : "▼"}</span>
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