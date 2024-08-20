"use client";
import { sendPredictions } from "@app/actions";
import type { Matches } from "@app/types";
import { useState } from "react";
import MatchField from "./MatchField";

const Form = ({ matches }: { matches: Matches }) => {
	const [matchOfTheMatch, setMatchOfTheMatch] = useState<number>();

	return (
		<form className="lg:mt-4 lg:px-2" action={sendPredictions}>
			{matches.map((m) => (
				<MatchField
					match={m}
					key={m.match_id}
					setMatchOfTheMatch={setMatchOfTheMatch}
					isMatchOfTheMatch={matchOfTheMatch === m.match_id}
				/>
			))}
			<input type="hidden" value={matchOfTheMatch} name="matchOfTheMatch" />
			<input type="submit" className="hidden" />
		</form>
	);
};

export default Form;
