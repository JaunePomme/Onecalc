"use client";
import { useState } from "react";

const activityLevels = [
	{ label: "Sédentaire (peu ou pas d'exercice)", factor: 1.2 },
	{ label: "Légèrement actif (1-3 j/semaine)", factor: 1.375 },
	{ label: "Modérément actif (3-5 j/semaine)", factor: 1.55 },
	{ label: "Actif (6-7 j/semaine)", factor: 1.725 },
	{ label: "Très actif (sport intensif ou travail physique)", factor: 1.9 },
];

const faqData = [
	{
		question: "Quelle formule est utilisée ?",
		answer:
			"La formule de Harris-Benedict est utilisée pour estimer le métabolisme de base (BMR). Elle diffère selon le sexe.",
	},
	{
		question: "Quelle différence entre BMR et TDEE ?",
		answer:
			"Le BMR (métabolisme de base) correspond à l'énergie minimale nécessaire au repos. Le TDEE (dépense énergétique totale) inclut l'activité physique et représente vos besoins caloriques quotidiens.",
	},
	{
		question: "Comment l'activité influence-t-elle le besoin calorique ?",
		answer:
			"Plus votre niveau d'activité est élevé, plus votre TDEE augmente car votre corps dépense plus d'énergie au quotidien.",
	},
];

function calcBmr(sexe: string, poids: number, taille: number, age: number) {
	if (sexe === "homme") {
		// Harris-Benedict homme
		return 88.362 + 13.397 * poids + 4.799 * taille - 5.677 * age;
	} else {
		// Harris-Benedict femme
		return 447.593 + 9.247 * poids + 3.098 * taille - 4.330 * age;
	}
}

export default function BesoinCalorique() {
	const [sexe, setSexe] = useState("homme");
	const [poids, setPoids] = useState("");
	const [taille, setTaille] = useState("");
	const [age, setAge] = useState("");
	const [niveau, setNiveau] = useState(activityLevels[2].factor.toString());
	const [bmr, setBmr] = useState<null | number>(null);
	const [tdee, setTdee] = useState<null | number>(null);
	const [openFaq, setOpenFaq] = useState<number[]>([]);

	const handleCalc = (e: React.FormEvent) => {
		e.preventDefault();
		const p = parseFloat(poids.replace(",", "."));
		const t = parseFloat(taille.replace(",", "."));
		const a = parseInt(age, 10);
		const f = parseFloat(niveau);
		if (
			(sexe === "homme" || sexe === "femme") &&
			!isNaN(p) &&
			!isNaN(t) &&
			!isNaN(a) &&
			!isNaN(f)
		) {
			const bmrVal = calcBmr(sexe, p, t, a);
			setBmr(bmrVal);
			setTdee(bmrVal * f);
		} else {
			setBmr(null);
			setTdee(null);
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
				Calculateur de besoin calorique journalier
			</h1>
			<p className="mb-8">
				Estimez votre métabolisme de base (BMR) et vos besoins caloriques
				quotidiens (TDEE) selon votre profil et votre activité.
			</p>

			{/* Disclaimer placé juste après l'intro */}
			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
				<strong>Disclaimer :</strong> Estimation ; peut varier selon métabolisme.
			</div>

			<form
				onSubmit={handleCalc}
				className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
			>
				<label>
					Sexe :
					<select
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={sexe}
						onChange={(e) => setSexe(e.target.value)}
					>
						<option value="homme">Homme</option>
						<option value="femme">Femme</option>
					</select>
				</label>
				<label>
					Poids (kg) :
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
					Taille (cm) :
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
				<label>
					Âge (ans) :
					<input
						type="number"
						min="0"
						step="1"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={age}
						onChange={(e) => setAge(e.target.value)}
						required
					/>
				</label>
				<label>
					Niveau d'activité :
					<select
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={niveau}
						onChange={(e) => setNiveau(e.target.value)}
					>
						{activityLevels.map((lvl, idx) => (
							<option key={lvl.factor} value={lvl.factor}>
								{lvl.label}
							</option>
						))}
					</select>
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
					BMR (métabolisme de base) :{" "}
					<span className="text-lg font-bold">
						{bmr !== null ? Math.round(bmr) + " kcal" : "--"}
					</span>
					<br />
					TDEE (besoin calorique total) :{" "}
					<span className="text-lg font-bold">
						{tdee !== null ? Math.round(tdee) + " kcal" : "--"}
					</span>
				</div>
			</form>

			<section className="mb-6">
				<h2 className="text-xl font-semibold mb-2">
					Comment sont calculés BMR et TDEE&nbsp;?
				</h2>
				<p>
					Le BMR (métabolisme de base) est calculé selon la formule de
					Harris-Benedict, différente pour les hommes et les femmes. Le TDEE
					(Total Daily Energy Expenditure) est obtenu en multipliant le BMR par
					un facteur lié à votre niveau d'activité.
				</p>
				<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
					Homme : 88.362 + 13.397 × poids + 4.799 × taille - 5.677 × âge
					<br />
					Femme : 447.593 + 9.247 × poids + 3.098 × taille - 4.330 × âge
					<br />
					TDEE = BMR × facteur activité
				</div>
				<p>
					Exemple : Homme, 80 kg, 180 cm, 30 ans, actif → BMR ≈ 1850, TDEE ≈ 2850
					kcal
				</p>
			</section>

			<section className="mb-6" id="faq">
				<h2 className="text-xl font-semibold mb-4">
					FAQ - Questions fréquentes sur le besoin calorique
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