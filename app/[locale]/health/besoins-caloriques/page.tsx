"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

function calculateCalories(
	weight: number,
	height: number,
	age: number,
	gender: "male" | "female",
	activityLevel: number
) {
	const bmr =
		gender === "male"
			? 10 * weight + 6.25 * height - 5 * age + 5
			: 10 * weight + 6.25 * height - 5 * age - 161;
	return bmr * activityLevel;
}

export default function BesoinsCaloriquesPage() {
	const t = useTranslations("BesoinsCaloriques");
	const [weight, setWeight] = useState("");
	const [height, setHeight] = useState("");
	const [age, setAge] = useState("");
	const [gender, setGender] = useState<"male" | "female">("male");
	const [activityLevel, setActivityLevel] = useState("1.2");
	const [result, setResult] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleCalc = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		try {
			const numWeight = parseFloat(weight.replace(",", "."));
			const numHeight = parseFloat(height.replace(",", "."));
			const numAge = parseInt(age, 10);
			const numActivityLevel = parseFloat(activityLevel);
			if (
				isNaN(numWeight) ||
				isNaN(numHeight) ||
				isNaN(numAge) ||
				isNaN(numActivityLevel) ||
				numWeight <= 0 ||
				numHeight <= 0 ||
				numAge <= 0
			) {
				throw new Error(t("errorInvalid"));
			}
			setResult(
				calculateCalories(numWeight, numHeight, numAge, gender, numActivityLevel)
			);
		} catch (err) {
			setResult(null);
			setError(err instanceof Error ? err.message : t("errorGeneric"));
		}
	};

	return (
		<main className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
			<h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
			<p className="mb-8">{t("intro")}</p>
			<div className="mb-6 p-3 rounded bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-200 dark:border-yellow-800">
				<strong>{t("disclaimer")}</strong>
			</div>
			<form
				onSubmit={handleCalc}
				className="mb-6 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded shadow"
			>
				<label>
					{t("weightLabel")}
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={weight}
						onChange={(e) => setWeight(e.target.value)}
						required
					/>
				</label>
				<label>
					{t("heightLabel")}
					<input
						type="number"
						min="0"
						step="any"
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={height}
						onChange={(e) => setHeight(e.target.value)}
						required
					/>
				</label>
				<label>
					{t("ageLabel")}
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
				<div className="flex gap-4 mb-2">
					<label className="flex items-center gap-2">
						<input
							type="radio"
							name="gender"
							value="male"
							checked={gender === "male"}
							onChange={() => setGender("male")}
						/>
						{t("male")}
					</label>
					<label className="flex items-center gap-2">
						<input
							type="radio"
							name="gender"
							value="female"
							checked={gender === "female"}
							onChange={() => setGender("female")}
						/>
						{t("female")}
					</label>
				</div>
				<label>
					{t("activityLabel")}
					<select
						className="block w-full mt-1 p-2 border rounded text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-800"
						value={activityLevel}
						onChange={(e) => setActivityLevel(e.target.value)}
						required
					>
						<option value="1.2">{t("activitySedentary")}</option>
						<option value="1.375">{t("activityLight")}</option>
						<option value="1.55">{t("activityModerate")}</option>
						<option value="1.725">{t("activityActive")}</option>
						<option value="1.9">{t("activityVeryActive")}</option>
					</select>
				</label>
				<button
					type="submit"
					className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-2"
				>
					{t("calculate")}
				</button>
				<div className="mt-2">
					<span className="font-semibold">{t("resultLabel")}</span>
					<br />
					{error ? (
						<span className="text-red-600">{error}</span>
					) : result !== null ? (
						<span className="text-lg font-bold">
							{result.toLocaleString("fr-FR", {
								maximumFractionDigits: 0,
							})}{" "}
							kcal/jour
						</span>
					) : (
						"--"
					)}
				</div>
			</form>
		</main>
	);
}