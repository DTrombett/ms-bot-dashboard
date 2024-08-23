import { cache } from "react";
import type { MatchesData } from "./types";

const loadMatches = cache(async (id: number) => {
	console.log("here1");
	const matches = await fetch(
		`https://legaseriea.it/api/stats/live/match?match_day_id=${id}&order=oldest`,
		{ next: { revalidate: Infinity } }
	)
		.then((res) => res.json<MatchesData>())
		.catch(console.error);

	if (!matches?.success) return undefined;
	return matches;
});

export default loadMatches;
