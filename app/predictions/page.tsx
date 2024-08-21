import { auth } from "@app/auth";
import ForceLogin from "@app/ForceLogin";
import Header from "@app/Header";
import type { MatchesData } from "@app/types";
import { Bai_Jamjuree } from "next/font/google";
import Image from "next/image";
import { env } from "process";
import Form from "./Form";

const font = Bai_Jamjuree({
	subsets: ["latin"],
	display: "swap",
	weight: "400",
});
const bold = Bai_Jamjuree({
	subsets: ["latin"],
	display: "swap",
	weight: "700",
});
const medium = Bai_Jamjuree({
	subsets: ["latin"],
	display: "swap",
	weight: "500",
});
const semiBold = Bai_Jamjuree({
	subsets: ["latin"],
	display: "swap",
	weight: "600",
});

const Predictions = async () => {
	const session = await auth();

	if (!session) return <ForceLogin />;
	const matchDays = await fetch(
		`https://legaseriea.it/api/season/${env.SEASON_ID}/championship/A/matchday`,
		{ cache: "force-cache" }
	).then((res) =>
		res.json<
			| {
					success: true;
					data: {
						category_status: "LIVE" | "PLAYED" | "TO BE PLAYED";
						description: `${number}`;
						id_category: number;
					}[];
			  }
			| { success: false; message: string; errors: unknown[] }
		>()
	);

	if (!matchDays.success) return <>{matchDays.message}</>;
	const matchDay = matchDays.data.find(
		(d) => d.category_status === "TO BE PLAYED"
	);

	if (!matchDay) return <>No match to be played!</>;
	const matches = await fetch(
		`https://legaseriea.it/api/stats/live/match?match_day_id=${matchDay.id_category}&order=oldest`,
		{ cache: "force-cache" }
	).then((res) => res.json<MatchesData>());

	if (!matches.success) return <>{matches.message}</>;
	return (
		<>
			<Header session={session} title="PRONOSTICI" />
			<div className={`sm:px-4 lg:px-8 mb-8 ${font.className}`}>
				<div className="mx-6 sm:mx-4 mb-6 h-16 flex items-center">
					<Image
						alt="Serie A Enilive"
						src="https://img.legaseriea.it/vimages/6685b340/SerieA_ENILIVE_RGB.jpg"
						width={124}
						height={212}
						style={{ height: "64px" }}
						className="rounded-sm w-auto mr-4"
					/>
					<a
						className={`text-xl sm:text-2xl md:text-3xl mb-2 hover:underline ${bold.className}`}
						style={{ color: "#00e8da" }}
						href="https://legaseriea.it/it/serie-a"
						target="_blank"
						tabIndex={-1}
					>
						SERIE A ENILIVE
					</a>
				</div>
				<div className="flex flex-col p-4 rounded-lg border-white border-opacity-20 lg:border lg:bg-zinc-700 lg:bg-opacity-25">
					<div className="flex justify-between items-end px-2">
						<div>
							<h3
								className={`${semiBold.className} text-2xl mb-1`}
								style={{ color: "#00e8da" }}
							>
								2ª Giornata
							</h3>
							<span
								className={`${medium.className} text-lg`}
								style={{ color: "#d82b2b" }}
							>
								PRONOSTICI NON INSERITI
							</span>
						</div>
						<span
							className={`hidden lg:block w-44 text-center mx-1 text-lg ${medium.className}`}
						>
							IL TUO PRONOSTICO
						</span>
					</div>
					<Form matches={matches.data} />
				</div>
			</div>
		</>
	);
};

export default Predictions;

export const runtime = "edge";
