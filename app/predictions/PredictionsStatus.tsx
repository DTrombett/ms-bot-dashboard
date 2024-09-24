import { serieAMedium } from "@app/utils/fonts";
import loadMatchDay from "@app/utils/loadMatchDay";
import loadMatches from "@app/utils/loadMatches";
import loadPredictions from "@app/utils/loadPredictions";
import ms from "ms";

const PredictionsStatus = async ({ userId }: { userId: string }) => {
	const matchDay = await loadMatchDay();

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

	return (
		<>
			{predictions &&
				(predictions.length === matches.data.length &&
				predictions[0].match &&
				matchIds.includes(predictions[0].match) ? (
					<span
						className={`${serieAMedium.className} text-lg pr-2 border-r-2`}
						style={{ color: "#00a445" }}
					>
						PRONOSTICI INSERITI
					</span>
				) : (
					<span
						className={`${serieAMedium.className} text-lg pr-2 border-r-2`}
						style={{ color: "#d82b2b" }}
					>
						PRONOSTICI NON INSERITI
					</span>
				))}
			<span className={`${serieAMedium.className} text-lg pl-2`}>
				{ms(
					Date.now() - Date.parse(matches.data[0].date_time) + 1000 * 60 * 15,
					{ long: true }
				)}
			</span>
		</>
	);
};

export default PredictionsStatus;
