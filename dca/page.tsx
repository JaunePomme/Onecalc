"use client";
import { useState } from "react";

const faqData = [
	{
		question: "Qu’est-ce que le DCA (Dollar Cost Averaging) ?",
		answer:
			"Le DCA consiste à investir un montant fixe à intervalles réguliers, quelle que soit la variation du prix, afin de lisser le prix d’achat moyen dans le temps.",
	},
	{
		question: "Quels paramètres sont pris en compte dans la simulation ?",
		answer:
			"Le montant investi à chaque période, la fréquence, la durée, et l’évolution du prix de l’actif (historique ou hypothétique).",
	},
	{
		question: "Le simulateur prend-il en compte les frais ?",
		answer:
			"Non, ce simulateur ne prend pas en compte les éventuels frais de transaction ou d’achat.",
	},
];

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
	const [montant, setMontant] = useState("");
	const [prixInitial, setPrixInitial] = useState("");
	const [prixFinal, setPrixFinal] = useState("");
	const [periodes, setPeriodes] = useState("");
	const [result, setResult] = useState<ReturnType<typeof simulateDCA> | null>(
		null
	);
	const [error, setError] = useState<string | null>(null);
	const [openFaq, setOpenFaq] = useState<number[]>([]);

	const handleCalc = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		const m = parseFloat(montant.replace(",", "."));
		const pi = parseFloat(prixInitial.replace(",", "."));
		const pf = parseFloat(prixFinal.replace(",", "."));
		const n = parseInt(periodes, 10);
		if (isNaN(m) || m <= 0) {
			setResult(null);
			setError("Veuillez saisir un montant périodique valide.");
			return;
		}
		if (isNaN(pi) || pi <= 0) {
			setResult(null);
			setError("Veuillez saisir un prix initial valide.");
			return;
		}
		if (isNaN(pf) || pf <= 0) {
			setResult(null);
			setError("Veuillez saisir un prix final valide.");
			return;
		}
		if (isNaN(n) || n < 2) {
			setResult(null);
			setError("Veuillez saisir un nombre de périodes (≥2).");
			return;
		}
		setResult(
			simulateDCA({ montant: m, prixInitial: pi, prixFinal: pf, periodes: n })
		);
	};

	const toggleFaq = (idx: number) => {
		setOpenFaq((prev) =>
			prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
		);
	};

	return (
		<main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
			<h1 className="text-3xl font-bold mb-4">
				Simulateur DCA (achat périodique)
			</h1>
			<p className="mb-8">
				Simulez l’investissement progressif (DCA) sur un actif en faisant des
				achats réguliers.
			</p>

			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
				<strong>Disclaimer :</strong> Résultat indicatif, ne remplace pas un
				conseil financier ni ne prédit l’évolution réelle des marchés.
			</div>

			<form
				onSubmit={handleCalc}
				className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
			>
				<label>
					Montant investi à chaque période (€) :
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={montant}
						onChange={(e) => setMontant(e.target.value)}
						required
					/>
				</label>
				<label>
					Prix initial de l’actif (€) :
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={prixInitial}
						onChange={(e) => setPrixInitial(e.target.value)}
						required
					/>
				</label>
				<label>
					Prix final de l’actif (€) :
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={prixFinal}
						onChange={(e) => setPrixFinal(e.target.value)}
						required
					/>
				</label>
				<label>
					Nombre de périodes (mois, semaines…) :
					<input
						type="number"
						min="2"
						step="1"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={periodes}
						onChange={(e) => setPeriodes(e.target.value)}
						required
					/>
				</label>
				<button
					type="submit"
					className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
				>
					Simuler
				</button>
				<div className="mt-2">
					<span className="font-semibold">Résultat :</span>
					<br />
					{error ? (
						<span className="text-red-600">{error}</span>
					) : result ? (
						<>
							<span className="text-lg font-bold">
								Total investi :{" "}
								{result.totalInvesti.toLocaleString("fr-FR", {
									maximumFractionDigits: 2,
								})}{" "}
								€
							</span>
							<br />
							<span className="text-lg font-bold">
								Quantité totale achetée :{" "}
								{result.totalActif.toLocaleString("fr-FR", {
									maximumFractionDigits: 6,
								})}
							</span>
							<br />
							<span className="text-lg font-bold">
								Prix d’achat moyen :{" "}
								{result.prixMoyen.toLocaleString("fr-FR", {
									maximumFractionDigits: 4,
								})}{" "}
								€
							</span>
							<br />
							<span className="text-lg font-bold">
								Valeur finale :{" "}
								{result.valeurFinale.toLocaleString("fr-FR", {
									maximumFractionDigits: 2,
								})}{" "}
								€
							</span>
							<br />
							<span className="text-lg font-bold">
								Performance :{" "}
								{result.perf.toLocaleString("fr-FR", {
									maximumFractionDigits: 2,
								})}{" "}
								€ (
								{result.perfPct.toLocaleString("fr-FR", {
									maximumFractionDigits: 2,
								})}{" "}
								%)
							</span>
						</>
					) : (
						"--"
					)}
				</div>
			</form>

			<section className="mb-6" id="faq">
				<h2 className="text-xl font-semibold mb-4">FAQ - Simulateur DCA</h2>
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