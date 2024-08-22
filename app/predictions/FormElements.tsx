"use client";
import type { Matches, Prediction, User } from "@app/utils/types";
import { useEffect, useState } from "react";
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
	const [matchOfTheMatch, setMatchOfTheMatch] = useState(0);

	useEffect(() => {
		void predictionsPromise.then((p) => {
			if (p[0]?.match) setMatchOfTheMatch(p[0].match);
		});
	}, [predictionsPromise]);
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
			<input
				type="hidden"
				value={matchOfTheMatch}
				name="matchOfTheMatch"
				required
			/>
		</>
	);
};

export default FormElements;
