import { defaultNormal } from "@app/utils/fonts";
import type { Prediction, User } from "@app/utils/types";
import { memo, Suspense, useMemo, type Dispatch } from "react";
import PredictionInputBox from "./PredictionInputBox";

const predictionExamples = [
	"1",
	"X",
	"2",
	"1X",
	"12",
	"X2",
	"1 (1 - 0)",
	"1 (2 - 1)",
	"2 (0 - 1)",
	"2 (1 - 2)",
	"X (0 - 0)",
	"X (1 - 1)",
];

const PredictionInput = ({
	id,
	predictionsPromise,
	setEdited,
}: {
	id: number;
	predictionsPromise: Promise<
		(Pick<Prediction, "matchId" | "prediction"> & Pick<User, "match">)[]
	>;
	setEdited: Dispatch<boolean>;
}) => {
	const example = useMemo(
		() =>
			predictionExamples[Math.floor(Math.random() * predictionExamples.length)],
		[]
	);

	return (
		<div className="flex flex-col items-center w-40 mt-4 lg:mt-0">
			<Suspense
				fallback={
					<input
						type="text"
						name={id.toString()}
						required
						disabled
						placeholder={`es. ${example}`}
						className={`py-1 px-2 w-40 rounded text-xl bg-zinc-600 bg-opacity-25 ${defaultNormal.className}`}
					/>
				}
			>
				<PredictionInputBox
					id={id}
					example={example}
					predictionsPromise={predictionsPromise}
					setEdited={setEdited}
				/>
			</Suspense>
		</div>
	);
};

export default memo(PredictionInput);
