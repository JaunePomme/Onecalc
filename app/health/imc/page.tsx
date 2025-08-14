"use client";
import { useState } from "react";

const faqData = [
	{
		question: "Quelle est la plage normale ?",
		answer:
			"La plage normale de l’IMC pour un adulte se situe entre 18,5 et 24,9. En dessous, on parle d’insuffisance pondérale ; au-dessus, de surpoids ou d’obésité selon le seuil.",
	},
	{
		question: "L’IMC est-il fiable pour les sportifs ?",
		answer:
			"L’IMC peut surestimer la corpulence des sportifs car il ne fait pas la différence entre la masse musculaire et la masse grasse. Un sportif très musclé peut avoir un IMC élevé sans excès de graisse.",
	},
	{
		question: "Peut-on utiliser l’IMC pour les enfants ?",
		answer:
			"L’IMC chez l’enfant doit être interprété différemment, en fonction de l’âge et du sexe, à l’aide de courbes de croissance spécifiques. Demandez conseil à un professionnel de santé.",
	},
];

function getImcCategory(imc: number) {
	if (imc < 18.5) return "Insuffisance pondérale";
	if (imc < 25) return "Poids normal";
	if (imc < 30) return "Surpoids";
	if (imc < 35) return "Obésité légère";
	if (imc < 40) return "Obésité modérée";
	return "Obésité massive";
}

export default function Imc() {
	const [poids, setPoids] = useState("");
	const [taille, setTaille] = useState("");
	const [imc, setImc] = useState<null | number>(null);
	const [categorie, setCategorie] = useState<string | null>(null);
	const [openFaq, setOpenFaq] = useState<number[]>([]);

	const handleCalc = (e: React.FormEvent) => {
		e.preventDefault();
		const p = parseFloat(poids.replace(",", "."));
		const t = parseFloat(taille.replace(",", ".")) / 100;
		if (!isNaN(p) && !isNaN(t) && t > 0) {
			const val = p / (t * t);
			setImc(val);
			setCategorie(getImcCategory(val));
		} else {
			setImc(null);
			setCategorie(null);
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
				Calculez votre IMC rapidement en ligne
			</h1>
			<p className="mb-8">Calculez votre IMC et découvrez votre catégorie.</p>

			{/* Disclaimer placé juste après l'intro */}
			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
				<strong>Disclaimer :</strong> Ne remplace pas avis médical.
			</div>

			<form
				onSubmit={handleCalc}
				className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
			>
				<label className="hidden">
					Menu principal
					<input type="text" tabIndex={-1} autoComplete="off" />
				</label>
				<label>
					Poids (en kg) :
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
				<label>
					Taille (en cm) :
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={taille}
						onChange={(e) => setTaille(e.target.value)}
						required
					/>
				</label>
				<div className="text-xs text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
					⚠️ Les résultats sont donnés à titre indicatif.{" "}
					<a href="#faq" className="underline">
						En savoir plus
					</a>
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
					IMC :{" "}
					<span className="text-lg font-bold">
						{imc !== null
							? imc.toLocaleString("fr-FR", { maximumFractionDigits: 2 })
							: "--"}
					</span>
					, Catégorie :{" "}
					<span className="text-lg font-bold">{categorie ?? "--"}</span>
				</div>
			</form>

			<section className="mb-6" id="faq">
				<h2 className="text-xl font-semibold mb-4">
					FAQ - Questions fréquentes sur l’IMC
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
