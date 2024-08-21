"use client";
import type { Matches } from "@app/types";
import { useState } from "react";
import MatchField from "./MatchField";

const FormElements = ({ matches }: { matches: Matches }) => {
	const [matchOfTheMatch, setMatchOfTheMatch] = useState<number>();

	return (
		<>
			{matches.map((m) => (
				<MatchField
					match={m}
					key={m.match_id}
					setMatchOfTheMatch={setMatchOfTheMatch}
					isMatchOfTheMatch={matchOfTheMatch === m.match_id}
				/>
			))}
			<input type="hidden" value={matchOfTheMatch} name="matchOfTheMatch" />
		</>
	);
};

export default FormElements;
