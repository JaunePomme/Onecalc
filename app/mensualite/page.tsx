"use client";
import { useState } from "react";

const faqData = [
	{
		question: "Comment calculer la mensualité d’un prêt immobilier avec ce simulateur ?",
		answer:
			"Notre simulateur de prêt immobilier calcule votre mensualité en fonction du montant emprunté, de la durée et du taux d’intérêt. Il vous permet d’estimer le remboursement mensuel de votre crédit immobilier facilement et gratuitement.",
	},
	{
		question: "Est-ce que la mensualité change si le taux de mon prêt immobilier augmente ?",
		answer:
			"Oui, si votre crédit immobilier est à taux variable, la mensualité évolue en fonction du marché. Avec un prêt immobilier à taux fixe, le calcul de la mensualité reste identique sur toute la durée du prêt.",
	},
	{
		question: "Pourquoi utiliser un simulateur de mensualité pour un crédit immobilier ?",
		answer:
			"Simuler vos mensualités de prêt immobilier vous aide à prévoir votre budget, à comparer plusieurs offres de crédit et à estimer le coût total de votre emprunt immobilier avant de signer.",
	},
	{
		question: "Comment réduire le montant de mes mensualités de prêt immobilier ?",
		answer:
			"Pour réduire la mensualité de votre crédit immobilier, vous pouvez allonger la durée du prêt ou négocier un taux d’intérêt plus bas. Attention : allonger la durée augmente le coût total du crédit immobilier.",
	},
	{
		question: "Quelle différence entre mensualité de prêt immobilier et coût total du crédit ?",
		answer:
			"La mensualité est le montant que vous remboursez chaque mois pour votre prêt immobilier. Le coût total du crédit correspond à l’ensemble des mensualités et des intérêts payés sur toute la durée de l’emprunt.",
	},
];

export default function Mensualite() {
	const [amount, setAmount] = useState("");
	const [rate, setRate] = useState("");
	const [years, setYears] = useState("");
	const [result, setResult] = useState<null | number>(null);
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	const handleCalc = (e: React.FormEvent) => {
		e.preventDefault();
		const capital = parseFloat(amount.replace(",", "."));
		const tauxAnnuel = parseFloat(rate.replace(",", ".")) / 100;
		const dureeAnnees = parseFloat(years.replace(",", "."));
		const n = dureeAnnees * 12;
		const tauxMensuel = tauxAnnuel / 12;
		if (!isNaN(capital) && !isNaN(tauxMensuel) && !isNaN(n) && n > 0) {
			const mensualite =
				tauxMensuel === 0
					? capital / n
					: (capital * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -n));
			setResult(mensualite * 12); // Coût annuel
		} else {
			setResult(null);
		}
	};

	return (
		<main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
			<h1 className="text-3xl font-bold mb-4">
				Calculez la mensualité de votre prêt en quelques clics
			</h1>
			<p className="mb-8">Simulez vos mensualités en fonction du montant, taux et durée.</p>

			<form
				onSubmit={handleCalc}
				className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
			>
				<label className="hidden">
					Menu principal
					<input type="text" tabIndex={-1} autoComplete="off" />
				</label>
				<label>
					Montant du prêt (€) :
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
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
						value={rate}
						onChange={(e) => setRate(e.target.value)}
						required
					/>
				</label>
				<label>
					Durée (en années) :
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={years}
						onChange={(e) => setYears(e.target.value)}
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
					Coût annuel :{" "}
					<span className="text-lg font-bold">
						{result !== null
							? `${result.toLocaleString("fr-FR", {
									maximumFractionDigits: 2,
							  })} €`
							: "-- €"}
					</span>
				</div>
			</form>

			<section className="mb-6">
				<h2 className="text-xl font-semibold mb-2">
					Comment calculer les mensualités d’un prêt ?
				</h2>
				<p>
					Le calcul des mensualités d’un prêt est essentiel pour bien gérer son
					budget. Il vous permet de savoir combien vous devrez rembourser chaque mois
					pour un crédit immobilier, auto ou personnel. En connaissant le montant des
					mensualités, vous pouvez évaluer si un emprunt est compatible avec votre
					situation financière.
				</p>
			</section>

			<section className="mb-6">
				<h3 className="text-lg font-semibold mb-2">Comment est-ce calculé ?</h3>
				<p>
					Les mensualités d’un prêt sont calculées à l’aide d’une formule mathématique
					qui tient compte de trois éléments principaux :
				</p>
				<ul className="list-disc ml-6 mb-2">
					<li>Le montant emprunté (ou capital)</li>
					<li>La durée du prêt (en nombre de mois)</li>
					<li>Le taux d’intérêt annuel (généralement exprimé en % fixe)</li>
				</ul>
				<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
					Mensualité = [Capital × Taux Mensuel] / [1 - (1 + Taux Mensuel)
					<sup>(-Nombre de mensualités)</sup>]
				</div>
				<p>
					Le taux mensuel est obtenu en divisant le taux annuel par 12. Voici un
					exemple :
				</p>
				<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
					Montant emprunté : 20 000 €<br />
					Taux annuel : 3 %<br />
					Durée : 5 ans (soit 60 mois)<br />
					<br />
					Taux mensuel = 3 / 100 / 12 = 0,0025<br />
					Mensualité = [20 000 × 0,0025] / [1 - (1 + 0,0025)
					<sup>(-60)</sup>] ≈ 359,37 €
				</div>
				<p>
					Dans cet exemple, vous devrez rembourser environ 359,37 € chaque mois
					pourtant 5 ans.
				</p>
			</section>

			<section className="mb-6">
				<h3 className="text-lg font-semibold mb-2">
					Comment le taux influence-t-il les mensualités ?
				</h3>
				<p>
					Plus le taux d’intérêt est élevé, plus les mensualités seront importantes.
					À l’inverse, un taux faible permet de réduire le coût total du crédit. Il
					est donc important de comparer les offres de prêt avant de s’engager.
				</p>
				<p>
					De même, allonger la durée du prêt diminue le montant des mensualités, mais
					augmente le coût total du crédit à cause des intérêts supplémentaires.
					Voici une comparaison :
				</p>
				<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono text-sm">
					Montant emprunté : 20 000 € – Taux annuel : 3 %<br />
					<br />
					Durée de 5 ans → Mensualité ≈ 359 € – Coût total ≈ 21 562 €<br />
					Durée de 10 ans → Mensualité ≈ 193 € – Coût total ≈ 23 160 €
				</div>
			</section>

			<section className="mb-6">
				<h3 className="text-lg font-semibold mb-2">
					Applications pratiques du calcul des mensualités
				</h3>
				<ul className="list-disc ml-6 mb-2">
					<li>
						<strong>Crédit immobilier :</strong> Estimer vos mensualités avant de
						faire une offre d’achat pour un bien immobilier.
					</li>
					<li>
						<strong>Crédit auto :</strong> Savoir à l’avance combien vous coûtera
						votre voiture chaque mois.
					</li>
					<li>
						<strong>Budget personnel :</strong> Ajuster vos dépenses en fonction de
						vos remboursements mensuels.
					</li>
					<li>
						<strong>Simulation comparative :</strong> Comparer plusieurs prêts pour
						choisir celui qui correspond le mieux à vos besoins.
					</li>
				</ul>
			</section>

			<section className="mb-6">
				<h3 className="text-lg font-semibold mb-2">Pourquoi utiliser ce calcul ?</h3>
				<ul className="list-disc ml-6 mb-2">
					<li>
						<strong>Anticiper l’impact sur votre budget :</strong> Vous saurez
						précisément combien vous devrez payer chaque mois.
					</li>
					<li>
						<strong>Éviter le surendettement :</strong> En simulant plusieurs
						scénarios, vous pouvez éviter de vous engager dans un prêt trop lourd à
						rembourser.
					</li>
					<li>
						<strong>Négocier votre prêt :</strong> En connaissant les paramètres du
						calcul, vous serez mieux armé pour discuter des conditions avec votre
						banquier.
					</li>
				</ul>
			</section>

			<section className="mb-6" id="faq">
				<h2 className="text-xl font-semibold mb-4">
					FAQ - Questions fréquentes sur le simulateur de mensualité de prêt immobilier
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
								onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
								aria-expanded={openFaq === idx}
								aria-controls={`faq-panel-${idx}`}
							>
								{item.question}
								<span className="ml-2">
									{openFaq === idx ? "▲" : "▼"}
								</span>
							</button>
							{openFaq === idx && (
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