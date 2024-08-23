import { getRequestContext } from "@cloudflare/next-on-pages";
import { cache } from "react";
import type { Prediction, User } from "./types";

const loadPredictions = cache(async (userId: string, ...matches: number[]) => {
	console.log("here2");
	const { results } = await getRequestContext()
		.env.DB.prepare(
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

	return results;
});

export default loadPredictions;
