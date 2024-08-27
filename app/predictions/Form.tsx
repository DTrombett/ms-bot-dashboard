"use client";
import { sendPredictions } from "@app/utils/actions";
import { predictionRegex } from "@app/utils/Constants";
import type { Matches, Prediction, User } from "@app/utils/types";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import FormElements from "./FormElements";

const SavePopup = dynamic(() => import("./SavePopup"));
const ErrorPopup = dynamic(() => import("./ErrorPopup"));

const Form = ({
	matches,
	matchDayId,
	predictionsPromise,
}: {
	matches: Matches;
	matchDayId: number;
	predictionsPromise: Promise<
		| (Pick<Prediction, "matchId" | "prediction"> & Pick<User, "match">)[]
		| undefined
	>;
}) => {
	const [state, action, pending] = useFormState<
		| { error: string }
		| { invalid: number[]; validMatchOfTheMatch: boolean }
		| undefined,
		FormData
	>(sendPredictions, undefined);
	const [edited, setEdited] = useState(false);
	const [error, setError] = useState<number[] | string>();

	useEffect(() => {
		setEdited(false);
		if (state)
			if ("error" in state) setError(state.error);
			else if (state.invalid.length) setError(state.invalid);
			else if (!state.validMatchOfTheMatch)
				setError("Match of the Match non valido!");
	}, [state]);
	return (
		<form
			className="lg:mt-4 lg:px-2"
			id="form"
			action={action}
			onSubmit={(event) => {
				if (
					Date.now() >
					new Date(matches[0].date_time).getTime() - 1_000 * 60 * 15
				) {
					setError("Questi pronostici sono scaduti!");
					event.preventDefault();
					return;
				}
				if (pending) {
					event.preventDefault();
					return;
				}
				const form = new FormData(event.currentTarget);
				const matchOfTheMatch = form.get("matchOfTheMatch");
				let validMatchOfTheMatch: boolean | undefined;
				const invalid = matches.filter((match) => {
					const name = match.match_id.toString();

					if (name === matchOfTheMatch) validMatchOfTheMatch = true;
					const value = form.get(name);

					if (typeof value !== "string") return true;
					const resolvedValue = value.toLowerCase().match(predictionRegex);

					return (
						!resolvedValue?.groups ||
						(resolvedValue[0].startsWith("x") &&
							resolvedValue.groups.first !== resolvedValue.groups.second) ||
						(resolvedValue[0].startsWith("1") &&
							resolvedValue.groups.first &&
							resolvedValue.groups.first <= resolvedValue.groups.second) ||
						(resolvedValue[0].startsWith("2") &&
							resolvedValue.groups.first &&
							resolvedValue.groups.first >= resolvedValue.groups.second) ||
						(resolvedValue.groups.first &&
							Number(resolvedValue.groups.first) > 999) ||
						(resolvedValue.groups.second &&
							Number(resolvedValue.groups.second) > 999)
					);
				});

				if (invalid.length) {
					setError(invalid.map((m) => m.match_id));
					event.preventDefault();
					return;
				}
				if (!validMatchOfTheMatch) {
					setError("Match of the Match non valido!");
					event.preventDefault();
				}
			}}
		>
			<FormElements
				matches={matches}
				predictionsPromise={predictionsPromise}
				setEdited={setEdited}
			/>
			<input type="hidden" name="matchDayId" value={matchDayId} />
			{edited && <SavePopup pending={pending} />}
			{error && (
				<ErrorPopup error={error} matches={matches} setError={setError} />
			)}
		</form>
	);
};

export default Form;
