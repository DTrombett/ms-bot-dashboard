import { serieASemiBold } from "@app/utils/fonts";
import type { Matches } from "@app/utils/types";
import Image from "next/image";
import { memo } from "react";

const MatchTitle = ({ match }: { match: Matches[number] }) => (
	<div
		className={`flex-1 flex flex-col sm:w-full lg:w-auto sm:flex-row justify-center text-nowrap text-xl ${serieASemiBold.className}`}
	>
		<div className="flex-1 flex justify-center lg:justify-end">
			<a
				className="hover:underline"
				href={`https://legaseriea.it${match.home_team_url}`}
				target="_blank"
				tabIndex={-1}
			>
				{match.home_team_name}
			</a>
			<Image
				src={match.home_team_logo}
				alt={`${match.home_team_name} logo`}
				className="inline ml-2 w-8 h-auto"
				width={64}
				height={64}
			/>
		</div>
		<span
			className="mx-8 my-2 lg:my-0 sm:flex-1 lg:flex-none text-center lg:text-left"
			style={{ color: "#00e8da" }}
		>
			VS
		</span>
		<div className="flex-1 flex justify-center lg:justify-start">
			<Image
				src={match.away_team_logo}
				alt={`${match.away_team_name} logo`}
				className="inline mr-2 -ml-2 lg:ml-0 w-8 h-auto"
				width={64}
				height={64}
			/>
			<a
				className="hover:underline"
				href={`https://legaseriea.it${match.away_team_url}`}
				target="_blank"
				tabIndex={-1}
			>
				{match.away_team_name}
			</a>
		</div>
	</div>
);

export default memo(MatchTitle);
