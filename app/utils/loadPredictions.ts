import { cache } from "react";
import getRequestContext from "./getRequestContext";
import type { Prediction, User } from "./types";

const loadPredictions = cache(async (userId: string, ...matches: number[]) => {
	const result = await getRequestContext()
		?.env.DB.prepare(
			`SELECT Predictions.matchId,
	Predictions.prediction,
	Users.match
FROM Predictions
	JOIN Users ON Predictions.userId = Users.id
WHERE Users.id = ?
	AND Predictions.matchId IN (${Array(matches.length).fill("?").join(", ")})`
		)
		.bind(userId, ...matches)
		.all<Pick<Prediction, "matchId" | "prediction"> & Pick<User, "match">>();

	return result?.results;
});

export default loadPredictions;
