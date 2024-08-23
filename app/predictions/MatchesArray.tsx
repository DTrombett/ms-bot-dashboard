import type { Matches, Prediction, User } from "@app/utils/types";
import type { Dispatch } from "react";
import { memo } from "react";
import MatchField from "./MatchField";

const MatchesArray = ({
	matches,
	setMatchOfTheMatch,
	matchOfTheMatch,
	predictionsPromise,
	setEdited,
}: {
	matches: Matches;
	setMatchOfTheMatch: Dispatch<number>;
	matchOfTheMatch: number;
	predictionsPromise: Promise<
		(Pick<Prediction, "matchId" | "prediction"> & Pick<User, "match">)[]
	>;
	setEdited: Dispatch<boolean>;
}) =>
	matches.map((m) => (
		<MatchField
			match={m}
			key={m.match_id}
			setMatchOfTheMatch={setMatchOfTheMatch}
			isMatchOfTheMatch={matchOfTheMatch === m.match_id}
			predictionsPromise={predictionsPromise}
			setEdited={setEdited}
		/>
	));

export default memo(MatchesArray);
