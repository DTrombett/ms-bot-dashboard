"use client";
import { sendPredictions } from "@app/utils/actions";
import type { Matches, Prediction, User } from "@app/utils/types";
import { useFormState } from "react-dom";
import FormElements from "./FormElements";

const Form = ({
	matches,
	matchDayId,
	predictionsPromise,
}: {
	matches: Matches;
	matchDayId: number;
	predictionsPromise: Promise<
		(Pick<Prediction, "matchId" | "prediction"> & Pick<User, "match">)[]
	>;
}) => {
	const [state, action, pending] = useFormState<
		| { error: string }
		| { invalid: number[]; validMatchOfTheMatch: boolean }
		| undefined,
		FormData
	>(sendPredictions, undefined);

	return (
		<form className="lg:mt-4 lg:px-2" action={action}>
			<FormElements
				matches={matches}
				predictionsPromise={predictionsPromise}
				pending={pending}
				state={state}
			/>
			<input type="hidden" name="matchDayId" value={matchDayId} />
		</form>
	);
};

export default Form;
