"use client";
import { useState } from "react";

const faqData = [
	{
		question: "Pourquoi le taux d’endettement cible est-il souvent fixé à 35 % ?",
		answer:
			"Le taux d’endettement de 35 % est une référence courante utilisée par les banques françaises pour limiter le risque de surendettement. Il correspond à la part maximale de vos revenus nets pouvant être consacrée au remboursement de vos crédits. Ce seuil peut varier selon les profils et les établissements.",
	},
	{
		question: "Faut-il inclure le loyer dans les charges mensuelles ?",
		answer:
			"Oui, si vous êtes locataire, le loyer doit être inclus dans les charges mensuelles. Si vous achetez votre résidence principale et que le prêt servira à remplacer le loyer, celui-ci peut être exclu du calcul.",
	},
	{
		question: "Quel est l’impact de la durée du prêt sur la capacité d’emprunt ?",
		answer:
			"Plus la durée du prêt est longue, plus la mensualité maximale permet d’emprunter un capital élevé. Cependant, une durée plus longue augmente aussi le coût total du crédit à cause des intérêts.",
	},
	{
		question: "L’assurance emprunteur est-elle obligatoire ?",
		answer:
			"L’assurance emprunteur n’est pas légalement obligatoire, mais elle est systématiquement exigée par les banques pour couvrir les risques de décès, invalidité ou incapacité. Son coût doit être intégré dans le calcul de la mensualité maximale.",
	},
	{
		question: "Puis-je emprunter plus si j’ai peu de charges ?",
		answer:
			"Oui, moins vous avez de charges mensuelles, plus votre capacité d’emprunt augmente, car une plus grande part de vos revenus peut être consacrée au remboursement du prêt.",
	},
];

export default function Emprunt() {
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
		const t = parseFloat(tauxAnnuel.replace(",", ".")) / 100;
		const n = parseFloat(duree.replace(",", ".")) * 12;
		const a = parseFloat(assurance.replace(",", ".")) || 0;

		if (
			!isNaN(R) &&
			!isNaN(C) &&
			!isNaN(p) &&
			!isNaN(t) &&
			!isNaN(n) &&
			n > 0
		) {
			// Mensualité max
			const Mmax = R * p - C - a;
			setMensualiteMax(Mmax > 0 ? Mmax : 0);

			// Taux mensuel
			const r = t / 12;
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
			prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
		);
	};

	return (
		<main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
			<h1 className="text-3xl font-bold mb-4">
				Calculez votre capacité d’emprunt
			</h1>
			<p className="mb-8">
				Estimez le capital que vous pouvez emprunter selon vos revenus, charges,
				taux d’endettement cible, taux d’intérêt, durée et assurance.
			</p>

			{/* Disclaimer placé juste après l'intro */}
			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
				<strong>Disclaimer :</strong> Estimation indicative ; hors conditions
				réelles.
			</div>

			<form
				onSubmit={handleCalc}
				className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
			>
				<label>
					Revenus nets mensuels (€) :
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={revenus}
						onChange={(e) => setRevenus(e.target.value)}
						required
					/>
				</label>
				<label>
					Charges mensuelles (€) :
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={charges}
						onChange={(e) => setCharges(e.target.value)}
						required
					/>
				</label>
				<label>
					Taux d’endettement cible (%) :
					<input
						type="number"
						min="0"
						max="100"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={tauxEndettement}
						onChange={(e) => setTauxEndettement(e.target.value)}
						required
					/>
				</label>
				<label>
					Taux annuel (%) :
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={tauxAnnuel}
						onChange={(e) => setTauxAnnuel(e.target.value)}
						required
					/>
				</label>
				<label>
					Durée (années) :
					<input
						type="number"
						min="1"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={duree}
						onChange={(e) => setDuree(e.target.value)}
						required
					/>
				</label>
				<label>
					Assurance emprunteur mensuelle (€) :
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={assurance}
						onChange={(e) => setAssurance(e.target.value)}
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
					<span className="font-semibold">Résultats :</span>
					<br />
					Mensualité maximale :{" "}
					<span className="text-lg font-bold">
						{mensualiteMax !== null
							? `${mensualiteMax.toLocaleString("fr-FR", {
									maximumFractionDigits: 2,
							  })} €`
							: "-- €"}
					</span>
					<br />
					Capital empruntable :{" "}
					<span className="text-lg font-bold">
						{capitalMax !== null
							? `${capitalMax.toLocaleString("fr-FR", {
									maximumFractionDigits: 2,
							  })} €`
							: "-- €"}
					</span>
				</div>
			</form>

			<section className="mb-6">
				<h2 className="text-xl font-semibold mb-2">
					Comment calculer sa capacité d’emprunt ?
				</h2>
				<p>
					La capacité d’emprunt correspond au montant maximal que vous pouvez
					emprunter en fonction de vos revenus, charges, taux d’endettement
					cible, taux d’intérêt, durée du prêt et coût de l’assurance. Ce calcul
					vous aide à définir votre budget pour un projet immobilier ou tout autre
					crédit.
				</p>
			</section>

			<section className="mb-6">
				<h3 className="text-lg font-semibold mb-2">Formule de calcul</h3>
				<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
					Mensualité max = Revenus × Taux endettement cible - Charges - Assurance
					<br />
					Capital empruntable = Mensualité max × [1 - (1 + r)<sup>-n</sup>] / r
					<br />
					r = taux annuel / 12 ; n = 12 × durée (années)
				</div>
				<p>
					Exemple : Revenus = 3 500 €, Charges = 400 €, Taux endettement = 35 %,
					Taux annuel = 4 %, Durée = 20 ans
				</p>
				<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
					Mensualité max = 3 500 × 0,35 - 400 = 825 €
					<br />
					r = 0,04 / 12 = 0,00333 ; n = 240
					<br />
					Capital empruntable ≈ 825 × [1 - (1 + 0,00333)<sup>-240</sup>] / 0,00333
					≈ 136 143 €
				</div>
				<p>
					Dans cet exemple, vous pouvez emprunter environ 136 143 € sur 20 ans
					avec une mensualité maximale de 825 €.
				</p>
			</section>

			<section className="mb-6" id="faq">
				<h2 className="text-xl font-semibold mb-4">
					FAQ - Questions fréquentes sur la capacité d’emprunt
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
