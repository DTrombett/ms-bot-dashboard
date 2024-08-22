"use server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { auth, signIn as authSignIn, signOut as authSignOut } from "./auth";
import type { MatchesData, Prediction } from "./types";

const predictionRegex =
	/^(1|x|2|1x|12|x2|((?<prediction>1|2|x)\s*\(\s*(?<first>\d+)\s*-\s*(?<second>\d+)\s*\)))$/;

export const signIn = async (...args: Parameters<typeof authSignIn>) =>
	authSignIn(...args) as Promise<never>;
export const signOut = async (...args: Parameters<typeof authSignOut>) =>
	authSignOut(...args) as Promise<never>;
export const sendPredictions = async (form: FormData) => {
	const matchDayId = form.get("matchDayId");

	if (typeof matchDayId !== "string")
		return { error: "Invalid match day id provided" };
	const session = await auth();

	if (!session?.user?.id) return authSignIn("discord");
	const matches = await fetch(
		`https://legaseriea.it/api/stats/live/match?match_day_id=${matchDayId}&order=oldest`,
		{ next: { revalidate: Infinity } }
	)
		.then((res) => res.json<MatchesData>())
		.catch(console.error);

	if (!matches?.success) return { error: "Couldn't retrieve matches" };
	if (
		Date.now() >
		new Date(matches.data[0].date_time).getTime() - 1_000 * 60 * 15
	)
		return { error: "This predictions are expired" };
	const { DB } = getRequestContext().env;
	const invalid: number[] = [];
	const predictions: Prediction[] = [];
	const matchOfTheMatch = form.get("matchOfTheMatch");
	let validMatchOfTheMatch = false;

	for (const match of matches.data) {
		const name = match.match_id.toString();

		if (name === matchOfTheMatch) validMatchOfTheMatch = true;
		const value = form.get(name);

		if (typeof value !== "string") {
			invalid.push(match.match_id);
			continue;
		}
		const resolvedValue = value.toLowerCase().match(predictionRegex);

		if (
			!resolvedValue?.groups ||
			(resolvedValue[0].startsWith("x") &&
				resolvedValue.groups.first !== resolvedValue.groups.second) ||
			(resolvedValue[0].startsWith("1") &&
				resolvedValue.groups.first &&
				resolvedValue.groups.first <= resolvedValue.groups.second) ||
			(resolvedValue[0].startsWith("2") &&
				resolvedValue.groups.first &&
				resolvedValue.groups.first >= resolvedValue.groups.second) ||
			(resolvedValue.groups.first &&
				Number(resolvedValue.groups.first) > 999) ||
			(resolvedValue.groups.second && Number(resolvedValue.groups.second) > 999)
		)
			invalid.push(match.match_id);
		else
			predictions.push({
				prediction: resolvedValue.groups.prediction
					? `${resolvedValue.groups.prediction.toUpperCase()} (${
							resolvedValue.groups.first
					  } - ${resolvedValue.groups.second})`
					: value.toUpperCase(),
				matchId: match.match_id,
				userId: session.user.id,
			});
	}
	const predictionsQuery = DB.prepare(
		`INSERT OR REPLACE INTO Predictions (matchId, userId, prediction) VALUES ${"\n(?, ?, ?),".repeat(
			predictions.length
		)}`.slice(0, -1)
	).bind(...predictions.flatMap((m) => [m.matchId, m.userId, m.prediction]));

	await DB.batch([
		typeof matchOfTheMatch === "string" && validMatchOfTheMatch
			? DB.prepare(
					`INSERT INTO Users(id, match)
			VALUES (?1, ?2)
			ON CONFLICT (id) DO UPDATE SET
					match=excluded.match`
			  ).bind(session.user.id, form.get("matchOfTheMatch"))
			: DB.prepare(
					`INSERT
			OR IGNORE INTO Users(id)
		VALUES (?)`
			  ).bind(session.user.id),
		predictionsQuery,
	]);
	return { invalid, validMatchOfTheMatch };
};
