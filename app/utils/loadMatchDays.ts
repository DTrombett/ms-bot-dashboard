import { env } from "process";
import { cache } from "react";
import type { MatchDays } from "./types";

const loadMatchDays = cache(async () => {
	const matchDays = await fetch(
		`https://legaseriea.it/api/season/${env.SEASON_ID}/championship/A/matchday`,
		{ next: { revalidate: Infinity } }
	)
		.then((res) => res.json<MatchDays>())
		.catch(console.error);

	if (!matchDays?.success) return undefined;
	return matchDays.data.find((d) => d.category_status === "TO BE PLAYED");
});

export default loadMatchDays;
