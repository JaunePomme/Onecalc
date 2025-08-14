"use client";
import { useState } from "react";

const faqData = [
	{
		question: "Qu’est-ce que la règle de trois ?",
		answer:
			"La règle de trois permet de calculer une quatrième valeur proportionnelle à trois valeurs connues. Elle est utilisée pour résoudre des problèmes de proportion.",
	},
	{
		question: "Comment l’utiliser ?",
		answer:
			"Entrez trois valeurs : si A correspond à B, alors C correspond à X. Le calcul donne X = (B × C) / A.",
	},
	{
		question: "Dans quels cas l’appliquer ?",
		answer:
			"La règle de trois s’applique pour les situations de proportionnalité directe (recettes, conversions, pourcentages, etc.).",
	},
];

function regleDeTrois(a: number, b: number, c: number) {
	if (a === 0) return null;
	return (b * c) / a;
}

export default function RegleDeTroisPage() {
	const [a, setA] = useState("");
	const [b, setB] = useState("");
	const [c, setC] = useState("");
	const [result, setResult] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [openFaq, setOpenFaq] = useState<number[]>([]);

	const handleCalc = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		const va = parseFloat(a.replace(",", "."));
		const vb = parseFloat(b.replace(",", "."));
		const vc = parseFloat(c.replace(",", "."));
		if (isNaN(va) || isNaN(vb) || isNaN(vc)) {
			setResult(null);
			setError("Veuillez saisir trois valeurs numériques valides.");
			return;
		}
		if (va === 0) {
			setResult(null);
			setError("La première valeur (A) doit être différente de zéro.");
			return;
		}
		setResult(regleDeTrois(va, vb, vc));
	};

	const toggleFaq = (idx: number) => {
		setOpenFaq((prev) =>
			prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
		);
	};

	return (
		<main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
			<h1 className="text-3xl font-bold mb-4">
				Règle de trois / proportions
			</h1>
			<p className="mb-8">
				Calculez une valeur proportionnelle à partir de trois valeurs connues
				(règle de trois).
			</p>

			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
				<strong>Disclaimer :</strong> Résultat indicatif, à vérifier selon le
				contexte d’application.
			</div>

			<form
				onSubmit={handleCalc}
				className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
			>
				<div className="flex flex-col md:flex-row gap-2">
					<label className="flex-1">
						A :
						<input
							type="number"
							min="0"
							step="any"
							className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
							value={a}
							onChange={(e) => setA(e.target.value)}
							required
						/>
					</label>
					<label className="flex-1">
						B :
						<input
							type="number"
							min="0"
							step="any"
							className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
							value={b}
							onChange={(e) => setB(e.target.value)}
							required
						/>
					</label>
					<label className="flex-1">
						C :
						<input
							type="number"
							min="0"
							step="any"
							className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
							value={c}
							onChange={(e) => setC(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
					Si A correspond à B, alors C correspond à X = (B × C) / A
				</div>
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
					) : result !== null ? (
						<span className="text-lg font-bold">
							{result.toLocaleString("fr-FR", { maximumFractionDigits: 6 })}
						</span>
					) : (
						"--"
					)}
				</div>
			</form>

			<section className="mb-6" id="faq">
				<h2 className="text-xl font-semibold mb-4">
					FAQ - Règle de trois / proportions
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