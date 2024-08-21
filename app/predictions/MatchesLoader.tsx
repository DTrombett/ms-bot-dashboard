import type { MatchesData } from "@app/types";
import { env } from "process";
import FormElements from "./FormElements";
import { sendPredictions } from "@app/actions";

const MatchesLoader = async () => {
	const matchDays = await fetch(
		`https://legaseriea.it/api/season/${env.SEASON_ID}/championship/A/matchday`,
		{ cache: "force-cache" }
	).then((res) =>
		res.json<
			| {
					success: true;
					data: {
						category_status: "LIVE" | "PLAYED" | "TO BE PLAYED";
						description: `${number}`;
						id_category: number;
					}[];
			  }
			| { success: false; message: string; errors: unknown[] }
		>()
	);

	if (!matchDays.success) return <>{matchDays.message}</>;
	const matchDay = matchDays.data.find(
		(d) => d.category_status === "TO BE PLAYED"
	);

	if (!matchDay) return <>No match to be played!</>;
	const matches = await fetch(
		`https://legaseriea.it/api/stats/live/match?match_day_id=${matchDay.id_category}&order=oldest`,
		{ cache: "force-cache" }
	).then((res) => res.json<MatchesData>());

	if (!matches.success) return <>{matches.message}</>;
	return (
		<form className="lg:mt-4 lg:px-2" action={sendPredictions}>
			<input type="submit" className="hidden" />
			<FormElements matches={matches.data} />
		</form>
	);
};

export default MatchesLoader;
