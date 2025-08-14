"use client";
import { useState } from "react";

const faqData = [
	{
		question: "Qu’est-ce que la formule C1V1 = C2V2 ?",
		answer:
			"C’est la formule de base pour calculer une dilution : C1 (concentration initiale) × V1 (volume prélevé) = C2 (concentration finale) × V2 (volume final).",
	},
	{
		question: "Comment l’utiliser ?",
		answer:
			"Entrez trois valeurs parmi C1, V1, C2, V2. Laissez la valeur à calculer vide : le calculateur la déterminera automatiquement.",
	},
	{
		question: "Quelles unités utiliser ?",
		answer:
			"Utilisez les mêmes unités pour les concentrations (ex : g/L, mol/L) et pour les volumes (ex : mL, L).",
	},
];

function solveDilution({
	C1,
	V1,
	C2,
	V2,
}: {
	C1?: number;
	V1?: number;
	C2?: number;
	V2?: number;
}) {
	// Exactly one must be undefined
	const values = [C1, V1, C2, V2];
	const missing = values.filter((v) => v === undefined).length;
	if (missing !== 1) return null;
	if (C1 === undefined) return (C2! * V2!) / V1!;
	if (V1 === undefined) return (C2! * V2!) / C1!;
	if (C2 === undefined) return (C1! * V1!) / V2!;
	if (V2 === undefined) return (C1! * V1!) / C2!;
	return null;
}

export default function DilutionPage() {
	const [C1, setC1] = useState("");
	const [V1, setV1] = useState("");
	const [C2, setC2] = useState("");
	const [V2, setV2] = useState("");
	const [result, setResult] = useState<{ label: string; value: number } | null>(
		null
	);
	const [error, setError] = useState<string | null>(null);
	const [openFaq, setOpenFaq] = useState<number[]>([]);

	const handleCalc = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		// Parse values, undefined if empty
		const c1 = C1.trim() === "" ? undefined : parseFloat(C1.replace(",", "."));
		const v1 = V1.trim() === "" ? undefined : parseFloat(V1.replace(",", "."));
		const c2 = C2.trim() === "" ? undefined : parseFloat(C2.replace(",", "."));
		const v2 = V2.trim() === "" ? undefined : parseFloat(V2.replace(",", "."));

		const nbMissing = [c1, v1, c2, v2].filter((v) => v === undefined).length;
		if (nbMissing !== 1) {
			setResult(null);
			setError("Laissez vide la valeur à calculer (remplissez les 3 autres).");
			return;
		}
		if (
			[c1, v1, c2, v2].some(
				(v, i) => v !== undefined && (isNaN(v as number) || (v as number) <= 0)
			)
		) {
			setResult(null);
			setError(
				" toutes les valeurs renseignées doivent être numériques et strictement positives."
			);
			return;
		}

		const res = solveDilution({ C1: c1, V1: v1, C2: c2, V2: v2 });
		if (res === null || !isFinite(res)) {
			setResult(null);
			setError("Impossible de calculer avec ces valeurs.");
			return;
		}

		let label = "";
		if (c1 === undefined) label = "C1 (concentration initiale)";
		if (v1 === undefined) label = "V1 (volume prélevé)";
		if (c2 === undefined) label = "C2 (concentration finale)";
		if (v2 === undefined) label = "V2 (volume final)";

		setResult({ label, value: res });
	};

	const toggleFaq = (idx: number) => {
		setOpenFaq((prev) =>
			prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
		);
	};

	return (
		<main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
			<h1 className="text-3xl font-bold mb-4">
				Calculateur de dilution (C₁V₁ = C₂V₂)
			</h1>
			<p className="mb-8">
				Calculez une concentration ou un volume inconnu à partir de la formule de
				dilution C₁V₁ = C₂V₂. Laissez vide la valeur à calculer.
			</p>

			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
				<strong>Disclaimer :</strong> Résultat indicatif, à vérifier pour les
				usages professionnels ou expérimentaux.
			</div>

			<form
				onSubmit={handleCalc}
				className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
			>
				<div className="flex flex-col md:flex-row gap-2">
					<label className="flex-1">
						C₁ (concentration initiale) :
						<input
							type="number"
							min="0"
							step="any"
							className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
							value={C1}
							onChange={(e) => setC1(e.target.value)}
							placeholder="ex: 2"
						/>
					</label>
					<label className="flex-1">
						V₁ (volume prélevé) :
						<input
							type="number"
							min="0"
							step="any"
							className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
							value={V1}
							onChange={(e) => setV1(e.target.value)}
							placeholder="ex: 10"
						/>
					</label>
				</div>
				<div className="flex flex-col md:flex-row gap-2">
					<label className="flex-1">
						C₂ (concentration finale) :
						<input
							type="number"
							min="0"
							step="any"
							className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
							value={C2}
							onChange={(e) => setC2(e.target.value)}
							placeholder="ex: 0.5"
						/>
					</label>
					<label className="flex-1">
						V₂ (volume final) :
						<input
							type="number"
							min="0"
							step="any"
							className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
							value={V2}
							onChange={(e) => setV2(e.target.value)}
							placeholder="ex: 40"
						/>
					</label>
				</div>
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
					Laissez vide la valeur à calculer. Unités cohérentes (ex : g/L et mL ou
					L).
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
					) : result ? (
						<span className="text-lg font-bold">
							{result.label} ={" "}
							{result.value.toLocaleString("fr-FR", {
								maximumFractionDigits: 6,
							})}
						</span>
					) : (
						"--"
					)}
				</div>
			</form>

			<section className="mb-6" id="faq">
				<h2 className="text-xl font-semibold mb-4">
					FAQ - Calcul de dilution
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