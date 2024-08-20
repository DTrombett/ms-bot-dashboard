import { Roboto } from "next/font/google";
import { memo } from "react";

const roboto = Roboto({
	subsets: ["latin"],
	display: "swap",
	weight: "400",
});
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

const PredictionInput = ({ id }: { id: number }) => (
	<div className="flex flex-col items-center w-40 mt-4 lg:mt-0">
		<input
			type="text"
			autoComplete="off"
			maxLength={16}
			name={id.toString()}
			pattern="^(1|x|2|1x|12|x2|((1|2|x)\s*\(\s*(\d+)\s*-\s*(\d+)\s*\)))$"
			required
			autoCapitalize="characters"
			placeholder={`es. ${
				predictionExamples[
					Math.floor(Math.random() * predictionExamples.length)
				]
			}`}
			className={`py-1 px-2 w-40 rounded-sm text-xl bg-zinc-700 bg-opacity-80 ${roboto.className}`}
		/>
	</div>
);

export default memo(PredictionInput);
