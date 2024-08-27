import { defaultNormal } from "@app/utils/fonts";
import type { Prediction, User } from "@app/utils/types";
import { use, type Dispatch } from "react";

const PredictionInputBox = ({
	id,
	example,
	predictionsPromise,
	setEdited,
}: {
	id: number;
	example: string;
	predictionsPromise: Promise<
		| (Pick<Prediction, "matchId" | "prediction"> & Pick<User, "match">)[]
		| undefined
	>;
	setEdited: Dispatch<boolean>;
}) => (
	<input
		type="text"
		autoComplete="off"
		maxLength={16}
		name={id.toString()}
		pattern="^(1|x|2|1x|12|x2|((1|2|x)\s*\(\s*(\d+)\s*-\s*(\d+)\s*\)))$"
		required
		autoCapitalize="characters"
		placeholder={`es. ${example}`}
		onChange={setEdited.bind(null, true)}
		defaultValue={
			use(predictionsPromise)?.find((predict) => predict.matchId === id)
				?.prediction
		}
		className={`py-1 px-2 w-40 rounded text-center text-xl bg-zinc-600 bg-opacity-25 ${defaultNormal.className}`}
	/>
);

export default PredictionInputBox;
