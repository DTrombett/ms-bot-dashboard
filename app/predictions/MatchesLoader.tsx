import { sendPredictions } from "@app/utils/actions";
import loadMatchDays from "@app/utils/loadMatchDays";
import loadMatches from "@app/utils/loadMatches";
import loadPredictions from "@app/utils/loadPredictions";
import FormElements from "./FormElements";

const MatchesLoader = async ({ userId }: { userId: string }) => {
	const matchDay = await loadMatchDays();

	if (!matchDay) return <>No match to be played!</>;
	const matches = await loadMatches(matchDay.id_category);

	if (!matches) return <>Failed to download the matches</>;
	return (
		<form className="lg:mt-4 lg:px-2" action={sendPredictions}>
			<FormElements
				matches={matches.data}
				predictionsPromise={loadPredictions(
					userId,
					...matches.data.map((m) => m.match_id)
				)}
			/>
			<input type="hidden" name="matchDayId" value={matchDay.id_category} />
			<input type="submit" className="hidden" />
		</form>
	);
};

export default MatchesLoader;
