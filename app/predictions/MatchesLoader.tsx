import loadMatchDays from "@app/utils/loadMatchDays";
import loadMatches from "@app/utils/loadMatches";
import loadPredictions from "@app/utils/loadPredictions";
import Form from "./Form";

const MatchesLoader = async ({ userId }: { userId: string }) => {
	const matchDay = await loadMatchDays();

	if (!matchDay) return <>No match to be played!</>;
	const matches = await loadMatches(matchDay.id_category);

	if (!matches) return <>Failed to download the matches</>;
	return (
		<Form
			matchDayId={matchDay.id_category}
			matches={matches.data}
			predictionsPromise={loadPredictions(
				userId,
				...matches.data.map((m) => m.match_id)
			)}
		/>
	);
};

export default MatchesLoader;
