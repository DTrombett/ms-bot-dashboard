import type { Matches, Prediction, User } from "@app/utils/types";
import { faStar } from "@fortawesome/free-regular-svg-icons/faStar";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, type Dispatch } from "react";
import DateTime from "./DateTime";
import MatchTitle from "./MatchTitle";
import PredictionInput from "./PredictionInput";

const MatchField = ({
	match,
	setMatchOfTheMatch,
	isMatchOfTheMatch,
	predictionsPromise,
}: {
	match: Matches[number];
	setMatchOfTheMatch: Dispatch<number>;
	isMatchOfTheMatch: boolean;
	predictionsPromise: Promise<
		(Pick<Prediction, "matchId" | "prediction"> & Pick<User, "match">)[]
	>;
}) => (
	<div className="flex flex-col lg:flex-row justify-between items-center border-white my-4 px-2 lg:h-16">
		<div className="w-full flex flex-row-reverse my-2 lg:my-0 justify-between lg:justify-start lg:flex-row items-center lg:w-40">
			<button
				className="h-12 w-12 lg:h-10 lg:w-10 p-2 rounded-lg lg:mr-2 hover:bg-zinc-700 hover:bg-opacity-50"
				title="Match of the Match"
				onClick={
					isMatchOfTheMatch
						? undefined
						: setMatchOfTheMatch.bind(null, match.match_id)
				}
				type="button"
			>
				<FontAwesomeIcon
					icon={isMatchOfTheMatch ? faSolidStar : faStar}
					className="w-8 h-8 lg:w-6 lg:h-6"
				/>
			</button>
			<DateTime date={match.date_time} />
		</div>
		<MatchTitle match={match} />
		<PredictionInput
			id={match.match_id}
			predictionsPromise={predictionsPromise}
		/>
	</div>
);

export default memo(MatchField);
