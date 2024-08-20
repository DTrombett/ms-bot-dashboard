import { auth } from "@app/auth";
import ForceLogin from "@app/ForceLogin";
import Header from "@app/Header";
import type { MatchesData } from "@app/types";
import { faStar } from "@fortawesome/free-regular-svg-icons/faStar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bai_Jamjuree, Roboto } from "next/font/google";
import Image from "next/image";

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
	"1 (1-0)",
	"1 (2-1)",
	"2 (0-1)",
	"2 (1-2)",
	"X (0-0)",
	"X (1-1)",
];

const Predictions = async () => {
	const session = await auth();

	if (!session) return <ForceLogin />;
	const matches = (await fetch(
		`https://www.legaseriea.it/api/stats/live/match?match_day_id=264711&order=oldest`
	).then((res) => res.json())) as MatchesData;

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
				<div className="flex flex-col p-4 rounded-lg border-white border-opacity-20 lg:border lg:bg-zinc-800 lg:bg-opacity-50">
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
					<div className="lg:mt-4 lg:px-2">
						{matches.data.map((m) => {
							const date = new Date(m.date_time);

							return (
								<div
									key={m.match_id}
									className="flex flex-col lg:flex-row justify-between items-center border-white my-4 px-2 lg:h-16"
								>
									<div className="w-full flex flex-row-reverse justify-between lg:justify-start lg:flex-row items-center lg:w-40">
										<FontAwesomeIcon
											icon={faStar}
											className="h-10 w-10 p-2 rounded-lg lg:mr-2 hover:bg-zinc-700 hover:bg-opacity-50"
											role="button"
											title="Match of the Match"
											tabIndex={0}
										/>
										<span className="text-sm text-white text-opacity-80">
											{date.toLocaleDateString("it")}
											<br className="hidden lg:inline" />
											<span className="lg:hidden">, </span>
											{date.toLocaleTimeString("it")}
										</span>
									</div>
									<div
										className={`flex-1 flex flex-col sm:w-full lg:w-auto sm:flex-row justify-center text-nowrap text-xl ${semiBold.className}`}
									>
										<div className="flex-1 flex justify-center lg:justify-end">
											<a
												className="hover:underline"
												href={`https://legaseriea.it${m.home_team_url}`}
												target="_blank"
												tabIndex={-1}
											>
												{m.home_team_name}
											</a>
											<Image
												src={m.home_team_logo}
												alt={`${m.home_team_name} logo`}
												className="inline ml-2 w-8 h-auto"
												width={64}
												height={64}
											/>
										</div>
										<span
											className="mx-8 my-1 lg:my-0 sm:flex-1 lg:flex-none text-center lg:text-left"
											style={{ color: "#00e8da" }}
										>
											VS
										</span>
										<div className="flex-1 flex justify-center lg:justify-start">
											<Image
												src={m.away_team_logo}
												alt={`${m.away_team_name} logo`}
												className="inline mr-2 -ml-2 lg:ml-0 w-8 h-auto"
												width={64}
												height={64}
											/>
											<a
												className="hover:underline"
												href={`https://legaseriea.it${m.away_team_url}`}
												target="_blank"
												tabIndex={-1}
											>
												{m.away_team_name}
											</a>
										</div>
									</div>
									<div className="flex flex-col items-center w-40 mt-4 lg:mt-0">
										<input
											type="text"
											id={`prediction-${m.match_id}`}
											placeholder={`es. ${
												predictionExamples[
													Math.floor(Math.random() * predictionExamples.length)
												]
											}`}
											className={`py-1 px-2 w-40 rounded-sm bg-zinc-700 bg-opacity-80 ${roboto.className}`}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Predictions;

export const runtime = "edge";
