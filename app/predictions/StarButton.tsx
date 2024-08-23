import type { Prediction, User } from "@app/utils/types";
import { faStar } from "@fortawesome/free-regular-svg-icons/faStar";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { use, useEffect, useRef, type Dispatch } from "react";

const StarButton = ({
	isMatchOfTheMatch,
	setMatchOfTheMatch,
	matchId,
	setEdited,
	predictionsPromise,
}: {
	isMatchOfTheMatch: boolean;
	setMatchOfTheMatch: Dispatch<number>;
	matchId: number;
	setEdited: Dispatch<boolean>;
	predictionsPromise: Promise<
		(Pick<Prediction, "matchId" | "prediction"> & Pick<User, "match">)[]
	>;
}) => {
	const ref = useRef(use(predictionsPromise)[0]?.match === matchId);
	const disabled = isMatchOfTheMatch || ref.current;

	useEffect(() => {
		ref.current = false;
	}, []);
	return (
		<button
			className="h-12 w-12 lg:h-10 lg:w-10 p-2 rounded-lg lg:mr-2 hover:bg-zinc-700 hover:bg-opacity-50"
			title="Match of the Match"
			onClick={
				disabled
					? undefined
					: () => {
							setMatchOfTheMatch(matchId);
							setEdited(true);
					  }
			}
			type="button"
		>
			<FontAwesomeIcon
				icon={disabled ? faSolidStar : faStar}
				className="w-8 h-8 lg:w-6 lg:h-6"
			/>
		</button>
	);
};

export default StarButton;
