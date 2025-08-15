"use client";
import { useState } from "react";

const faqData = [
	{
		question: "Comment calculer le rendement d’un investissement ?",
		answer:
			"Le calcul du rendement d’un investissement se fait en divisant le gain net généré par le montant investi initialement, puis en multipliant par 100 pour obtenir un pourcentage. Notre simulateur de rendement d’investissement vous aide à estimer ce taux facilement.",
	},
	{
		question: "Pourquoi calculer le rendement de son investissement ?",
		answer:
			"Calculer le rendement d’un investissement permet de mesurer la rentabilité réelle de votre placement et de comparer différentes options comme les actions, l’immobilier ou l’épargne pour optimiser vos gains.",
	},
	{
		question: "Qu’est-ce qu’un bon taux de rendement ?",
		answer:
			"Un bon taux de rendement dépend du type d’investissement et du risque associé. Par exemple, un rendement de 4 à 7 % est souvent considéré comme intéressant pour l’immobilier, tandis que les actions peuvent offrir des rendements plus élevés mais plus volatils.",
	},
	{
		question:
			"Faut-il prendre en compte les impôts dans le calcul du rendement ?",
		answer:
			"Oui, le rendement net d’un investissement doit inclure les impôts et frais éventuels pour refléter la rentabilité réelle de votre placement. Notre calculateur de rendement vous permet d’estimer ce montant plus précisément.",
	},
	{
		question: "Quelle est la différence entre rendement et plus-value ?",
		answer:
			"Le rendement désigne le revenu régulier généré par un investissement (dividendes, loyers), tandis que la plus-value correspond au gain réalisé lors de la revente de l’actif à un prix supérieur à son prix d’achat.",
	},
	{
		question: "Différence ROI/TRI ?",
		answer:
			"Le ROI (Return On Investment) mesure la rentabilité totale d’un investissement sur une période donnée, sans prendre en compte la durée. Le TRI (Taux de Rendement Interne) tient compte de la chronologie des flux de trésorerie et permet de comparer des investissements de durées différentes.",
	},
	{
		question: "Que mettre dans coûts ?",
		answer:
			"Dans les coûts, il faut inclure tous les montants investis : prix d’achat, frais d’acquisition, travaux, frais de gestion, impôts, charges, etc. Plus l’estimation est précise, plus le calcul du rendement sera fiable.",
	},
	{
		question: "ROI négatif ?",
		answer:
			"Un ROI négatif signifie que votre investissement a généré une perte : les coûts sont supérieurs aux gains. Cela peut arriver si les revenus sont insuffisants ou si la valeur de l’actif baisse.",
	},
];

export default function Roi() {
	const [invested, setInvested] = useState("");
	const [gains, setGains] = useState("");
	const [result, setResult] = useState<null | number>(null);
	const [openFaq, setOpenFaq] = useState<number[]>([]); // ← tableau d'index pour multi-ouverture

	const handleCalc = (e: React.FormEvent) => {
		e.preventDefault();
		const investedNum = parseFloat(invested.replace(",", "."));
		const gainsNum = parseFloat(gains.replace(",", "."));
		if (!isNaN(investedNum) && investedNum !== 0 && !isNaN(gainsNum)) {
			setResult((gainsNum / investedNum) * 100);
		} else {
			setResult(null);
		}
	};

	// Fonction pour ouvrir/fermer plusieurs FAQ
	const toggleFaq = (idx: number) => {
		setOpenFaq((prev) =>
			prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
		);
	};

	return (
		<main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
			<h1 className="text-3xl font-bold mb-4">
				Calculez facilement le rendement de votre investissement
			</h1>
			<p className="mb-8">
				Calculez le rendement de votre investissement en fonction du montant
				investi et des gains réalisés.
			</p>

			{/* Disclaimer placé juste après l'intro */}
			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
				<strong>Disclaimer :</strong> Indicateur simplifié ; ne remplace pas une
				analyse complète.
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
					Montant investi (€) :
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={invested}
						onChange={(e) => setInvested(e.target.value)}
						required
					/>
				</label>
				<label>
					Gains réalisés (€) :
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={gains}
						onChange={(e) => setGains(e.target.value)}
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
					Rendement :{" "}
					<span className="text-lg font-bold">
						{result !== null ? `${result.toFixed(2)} %` : "-- %"}
					</span>
				</div>
			</form>

			<section className="mb-6">
				<h2 className="text-xl font-semibold mb-2">
					Comment calculer le rendement d&apos;un investissement&nbsp;?
				</h2>
				<p>
					Le calcul du rendement est essentiel pour évaluer la rentabilité
					d&apos;un investissement. Il permet de savoir combien de gains un bien
					génère par rapport à son coût initial. Cela peut s&apos;appliquer à
					divers types d&apos;investissements, tels que l&apos;immobilier, les
					actions, ou les biens d&apos;entreprise.
				</p>
			</section>

			<section className="mb-6">
				<h3 className="text-lg font-semibold mb-2">
					Comment est-ce calculé&nbsp;?
				</h3>
				<p>
					Il existe différentes façons de calculer le rendement d&apos;un
					investissement :
				</p>
				<ul className="list-disc ml-6 mb-2">
					<li>
						<strong>Rendement brut</strong> : le rendement est calculé avant la
						prise en compte de certains frais (comme les impôts ou les charges).
					</li>
					<li>
						<strong>Rendement net</strong> : le rendement prend en compte les
						charges, impôts, et autres coûts pour donner une image plus précise
						de la rentabilité réelle.
					</li>
				</ul>
			</section>

			<section className="mb-6">
				<h4 className="font-semibold mb-1">Rendement brut</h4>
				<p>
					La formule de base pour calculer le rendement brut est la suivante :
				</p>
				<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono">
					Rendement brut = (Gains / Coût d&apos;achat) × 100
				</div>
				<p className="mb-1">Exemple :</p>
				<ul className="list-disc ml-6 mb-2">
					<li>Coût d&apos;achat : 100 000 €</li>
					<li>Gains annuels : 8 000 €</li>
				</ul>
				<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono">
					Rendement brut = (8 000 / 100 000) × 100 = 8 %
				</div>
				<p>
					Dans cet exemple, le rendement brut est de 8 %, ce qui signifie que le
					bien génère un revenu annuel équivalent à 8 % de son prix d&apos;achat.
				</p>
			</section>

			<section className="mb-6">
				<h4 className="font-semibold mb-1">Rendement net</h4>
				<p>
					Le rendement net prend en compte les frais associés au bien, comme les
					taxes, les charges d&apos;entretien, ou les frais de gestion. La formule
					devient :
				</p>
				<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono">
					Rendement net = (Gains - Frais) / Coût d&apos;achat × 100
				</div>
				<p className="mb-1">Exemple :</p>
				<ul className="list-disc ml-6 mb-2">
					<li>Coût d&apos;achat : 100 000 €</li>
					<li>Gains annuels : 8 000 €</li>
					<li>Frais annuels (charges, impôts, etc.) : 1 500 €</li>
				</ul>
				<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 font-mono">
					Rendement net = (8 000 - 1 500) / 100 000 × 100 = 6,5 %
				</div>
				<p>
					Le rendement net dans cet exemple est de 6,5 %, ce qui est plus
					précis, car il tient compte des dépenses réelles associées au bien.
				</p>
			</section>

			<section className="mb-6">
				<h3 className="text-lg font-semibold mb-2">
					Pourquoi utiliser le calcul du rendement d&apos;un bien&nbsp;?
				</h3>
				<p>
					Calculer le rendement d&apos;un bien est essentiel pour prendre des
					décisions éclairées sur les investissements. Cela permet de comparer
					différents biens ou investissements afin de choisir celui qui offre le
					meilleur retour sur investissement.
				</p>
			</section>

			<section className="mb-6">
				<h3 className="text-lg font-semibold mb-2">
					Applications pratiques du calcul du rendement
				</h3>
				<ul className="list-disc ml-6 mb-2">
					<li>
						<strong>Investissements immobiliers</strong> : Calculer le rendement
						d&apos;un bien immobilier permet de savoir si l&apos;achat d&apos;un bien
						est rentable en fonction de ses revenus locatifs.
					</li>
					<li>
						<strong>Investissements en actions</strong> : Calculer le rendement
						d&apos;un portefeuille d&apos;actions permet de mesurer la rentabilité
						des dividendes et des gains en capital.
					</li>
					<li>
						<strong>Évaluations d&apos;entreprise</strong> : Le rendement peut
						également être utilisé pour évaluer la rentabilité d&apos;un bien ou
						d&apos;un actif d&apos;entreprise.
					</li>
				</ul>
			</section>

			<section className="mb-6">
				<h3 className="text-lg font-semibold mb-2">
					Pourquoi utiliser ce calcul&nbsp;?
				</h3>
				<ul className="list-disc ml-6 mb-2">
					<li>
						<strong>Évaluer la rentabilité</strong> : Le rendement permet de
						connaître la rentabilité d&apos;un investissement en comparaison de
						son côut initial.
					</li>
					<li>
						<strong>Comparer des options d&apos;investissement</strong> : En
						calculant le rendement de différents biens, on peut faire un choix
						plus judicieux en fonction de l&apos;objectif d&apos;investissement.
					</li>
					<li>
						<strong>Optimiser les investissements</strong> : Calculer le
						rendement permet d&apos;ajuster les stratégies d&apos;investissement
						pour maximiser les profits et minimiser les risques.
					</li>
				</ul>
			</section>

			<section className="mb-6" id="faq">
				<h2 className="text-xl font-semibold mb-4">
					FAQ - Questions fréquentes sur le calcul du rendement d’investissement
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
