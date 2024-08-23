import { defaultMedium, defaultNormal } from "@app/utils/fonts";
import type { Matches } from "@app/utils/types";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons/faCircleExclamation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, type Dispatch } from "react";

const ErrorPopup = ({
	error,
	matches,
	setError,
}: {
	error: number[] | string;
	matches: Matches;
	setError: Dispatch<undefined>;
}) => (
	<div className="fixed flex top-0 bottom-0 left-0 right-0 bg-zinc-900 bg-opacity-60">
		<div className="bg-zinc-800 w-full h-full sm:w-96 sm:h-fit flex flex-col justify-between m-auto p-8 rounded-lg">
			<div
				className={`flex items-center mb-6 ${defaultMedium.className} text-2xl`}
			>
				<FontAwesomeIcon
					icon={faCircleExclamation}
					className="inline w-8 h-8 mr-4"
				/>
				Errore
			</div>
			<span className="text-lg flex-1">
				{typeof error === "string"
					? error
					: `I seguenti pronostici non sono validi: ${error
							.map(
								(m) =>
									matches.find((match) => match.match_id === m)?.match_name ??
									"Partita sconosciuta"
							)
							.join(", ")}`}
			</span>
			<button
				type="button"
				className={`flex cursor-pointer rounded-lg text-lg px-4 py-2 mt-6 mx-auto w-32 justify-center transition-all duration-200 hover:scale-105 active:scale-100 ${defaultNormal.className}`}
				style={{ backgroundColor: "#1f8b4c" }}
				onClick={setError.bind(null, undefined)}
				autoFocus
			>
				Ok
			</button>
		</div>
	</div>
);

export default memo(ErrorPopup);
