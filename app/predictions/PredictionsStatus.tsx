import { serieAMedium } from "@app/utils/fonts";
import loadMatchDays from "@app/utils/loadMatchDays";
import loadMatches from "@app/utils/loadMatches";
import loadPredictions from "@app/utils/loadPredictions";

const PredictionsStatus = async ({ userId }: { userId: string }) => {
	const matchDay = await loadMatchDays();

	if (!matchDay)
		return (
			<span className={`${serieAMedium.className} text-lg`}>{"\u200b"}</span>
		);
	const matches = await loadMatches(matchDay.id_category);

	if (!matches)
		return (
			<span className={`${serieAMedium.className} text-lg`}>{"\u200b"}</span>
		);
	const matchIds = matches.data.map((m) => m.match_id);
	const predictions = await loadPredictions(userId, ...matchIds);

	return predictions.length === matches.data.length &&
		predictions[0].match &&
		matchIds.includes(predictions[0].match) ? (
		<span
			className={`${serieAMedium.className} text-lg`}
			style={{ color: "#00a445" }}
		>
			PRONOSTICI INSERITI
		</span>
	) : (
		<span
			className={`${serieAMedium.className} text-lg`}
			style={{ color: "#d82b2b" }}
		>
			PRONOSTICI NON INSERITI
		</span>
	);
};

export default PredictionsStatus;
