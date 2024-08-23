import type { Matches, Prediction, User } from "@app/utils/types";
import dynamic from "next/dynamic";
import { memo, useEffect, useState } from "react";
import MatchesArray from "./MatchesArray";

const SavePopup = dynamic(() => import("./SavePopup"));
const ErrorPopup = dynamic(() => import("./ErrorPopup"));

const FormElements = ({
	matches,
	predictionsPromise,
	pending,
	state,
}: {
	matches: Matches;
	predictionsPromise: Promise<
		(Pick<Prediction, "matchId" | "prediction"> & Pick<User, "match">)[]
	>;
	pending: boolean;
	state:
		| { error: string }
		| { invalid: number[]; validMatchOfTheMatch: boolean }
		| undefined;
}) => {
	const [matchOfTheMatch, setMatchOfTheMatch] = useState(0);
	const [edited, setEdited] = useState(false);
	const [error, setError] = useState<number[] | string>();

	useEffect(() => {
		void predictionsPromise.then((p) => {
			if (p[0]?.match) setMatchOfTheMatch(p[0].match);
		});
	}, [predictionsPromise]);
	useEffect(() => {
		setEdited(false);
		if (state)
			if ("error" in state) setError(state.error);
			else if (state.invalid.length) setError(state.invalid);
			else if (!state.validMatchOfTheMatch)
				setError("Match of the Match non valido!");
	}, [state]);
	return (
		<>
			<MatchesArray
				matchOfTheMatch={matchOfTheMatch}
				matches={matches}
				predictionsPromise={predictionsPromise}
				setMatchOfTheMatch={setMatchOfTheMatch}
				setEdited={setEdited}
			/>
			<input
				type="hidden"
				value={matchOfTheMatch}
				name="matchOfTheMatch"
				min={1}
			/>
			{edited && <SavePopup pending={pending} />}
			{error && (
				<ErrorPopup error={error} matches={matches} setError={setError} />
			)}
		</>
	);
};

export default memo(FormElements);
