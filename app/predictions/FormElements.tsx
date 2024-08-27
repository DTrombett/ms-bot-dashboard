import type { Matches, Prediction, User } from "@app/utils/types";
import { memo, useEffect, useState, type Dispatch } from "react";
import MatchesArray from "./MatchesArray";

const FormElements = ({
	matches,
	predictionsPromise,
	setEdited,
}: {
	matches: Matches;
	predictionsPromise: Promise<
		| (Pick<Prediction, "matchId" | "prediction"> & Pick<User, "match">)[]
		| undefined
	>;
	setEdited: Dispatch<boolean>;
}) => {
	const [matchOfTheMatch, setMatchOfTheMatch] = useState(0);

	useEffect(() => {
		void predictionsPromise.then((p) => {
			if (p?.[0]?.match) setMatchOfTheMatch(p[0].match);
		});
	}, [predictionsPromise]);
	return (
		<>
			<MatchesArray
				matchOfTheMatch={matchOfTheMatch}
				matches={matches}
				predictionsPromise={predictionsPromise}
				setMatchOfTheMatch={setMatchOfTheMatch}
				setEdited={setEdited}
			/>
			<input type="hidden" value={matchOfTheMatch} name="matchOfTheMatch" />
		</>
	);
};

export default memo(FormElements);
