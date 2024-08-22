"use client";
import type { Matches, Prediction, User } from "@app/utils/types";
import { useState } from "react";
import MatchField from "./MatchField";

const FormElements = ({
	matches,
	predictionsPromise,
}: {
	matches: Matches;
	predictionsPromise: Promise<
		(Pick<Prediction, "matchId" | "prediction"> & Pick<User, "match">)[]
	>;
}) => {
	const [matchOfTheMatch, setMatchOfTheMatch] = useState<number>();

	return (
		<>
			{matches.map((m) => (
				<MatchField
					match={m}
					key={m.match_id}
					setMatchOfTheMatch={setMatchOfTheMatch}
					isMatchOfTheMatch={matchOfTheMatch === m.match_id}
					predictionsPromise={predictionsPromise}
				/>
			))}
			<input type="hidden" value={matchOfTheMatch} name="matchOfTheMatch" />
		</>
	);
};

export default FormElements;
