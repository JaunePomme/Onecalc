"use client";
import { useState } from "react";

const faqData = [
	{
		question: "Comment est estimé le besoin en eau ?",
		answer:
			"L’estimation se base sur le poids corporel : environ 30 à 40 ml d’eau par kg de poids, selon les recommandations courantes.",
	},
	{
		question: "Faut-il adapter selon l’activité ou la chaleur ?",
		answer:
			"Oui, il faut augmenter l’apport en cas d’activité physique, de forte chaleur ou de conditions particulières (maladie, grossesse…).",
	},
	{
		question: "L’eau des aliments compte-t-elle ?",
		answer:
			"Oui, une partie de l’hydratation provient des aliments (fruits, légumes…). Ce calcul donne un ordre de grandeur pour l’eau à boire.",
	},
];

function calcHydratation(poids: number) {
	// Fourchette basse et haute (30-40 ml/kg)
	return {
		bas: poids * 30,
		haut: poids * 40,
	};
}

export default function HydratationPage() {
	const [poids, setPoids] = useState("");
	const [result, setResult] = useState<{ bas: number; haut: number } | null>(
		null
	);
	const [error, setError] = useState<string | null>(null);
	const [openFaq, setOpenFaq] = useState<number[]>([]);

	const handleCalc = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		const p = parseFloat(poids.replace(",", "."));
		if (isNaN(p) || p <= 0) {
			setResult(null);
			setError("Veuillez saisir un poids valide.");
			return;
		}
		setResult(calcHydratation(p));
	};

	const toggleFaq = (idx: number) => {
		setOpenFaq((prev) =>
			prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
		);
	};

	return (
		<main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
			<h1 className="text-3xl font-bold mb-4">
				Estimation de l’hydratation quotidienne
			</h1>
			<p className="mb-8">
				Calculez la quantité d’eau recommandée par jour selon votre poids
				corporel.
			</p>

			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
				<strong>Disclaimer :</strong> Estimation indicative, ne remplace pas un
				avis médical.
			</div>

			<form
				onSubmit={handleCalc}
				className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
			>
				<label>
					Poids corporel (kg) :
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={poids}
						onChange={(e) => setPoids(e.target.value)}
						required
					/>
				</label>
				<button
					type="submit"
					className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
				>
					Calculer
				</button>
				<div className="mt-2">
					<span className="font-semibold">Résultat :</span>
					<br />
					{error ? (
						<span className="text-red-600">{error}</span>
					) : result ? (
						<>
							<span className="text-lg font-bold">
								{result.bas.toLocaleString("fr-FR", {
									maximumFractionDigits: 0,
								})}{" "}
								à{" "}
								{result.haut.toLocaleString("fr-FR", {
									maximumFractionDigits: 0,
								})}{" "}
								ml / jour
							</span>
							<br />
							<span className="text-xs text-gray-500">
								Soit {Math.round(result.bas / 100) / 10} à{" "}
								{Math.round(result.haut / 100) / 10} L / jour
							</span>
						</>
					) : (
						"--"
					)}
				</div>
			</form>

			<section className="mb-6" id="faq">
				<h2 className="text-xl font-semibold mb-4">
					FAQ - Hydratation quotidienne
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