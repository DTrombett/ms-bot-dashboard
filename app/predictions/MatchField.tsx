import type { Matches, Prediction, User } from "@app/utils/types";
import { memo, Suspense, type Dispatch } from "react";
import DateTime from "./DateTime";
import MatchTitle from "./MatchTitle";
import PredictionInput from "./PredictionInput";
import StarButton from "./StarButton";

const MatchField = ({
	match,
	setMatchOfTheMatch,
	isMatchOfTheMatch,
	predictionsPromise,
	setEdited,
}: {
	match: Matches[number];
	setMatchOfTheMatch: Dispatch<number>;
	isMatchOfTheMatch: boolean;
	predictionsPromise: Promise<
		(Pick<Prediction, "matchId" | "prediction"> & Pick<User, "match">)[]
	>;
	setEdited: Dispatch<boolean>;
}) => (
	<div className="flex flex-col lg:flex-row justify-between items-center border-white my-4 px-2 lg:h-16">
		<div className="w-full flex flex-row-reverse my-2 lg:my-0 justify-between lg:justify-start lg:flex-row items-center lg:w-40">
			<Suspense
				fallback={<div className="h-12 w-12 lg:h-10 lg:w-10 lg:mr-2" />}
			>
				<StarButton
					predictionsPromise={predictionsPromise}
					setEdited={setEdited}
					isMatchOfTheMatch={isMatchOfTheMatch}
					matchId={match.match_id}
					setMatchOfTheMatch={setMatchOfTheMatch}
				/>
			</Suspense>
			<DateTime date={match.date_time} />
		</div>
		<MatchTitle match={match} />
		<PredictionInput
			id={match.match_id}
			predictionsPromise={predictionsPromise}
			setEdited={setEdited}
		/>
	</div>
);

export default memo(MatchField);
