import ForceLogin from "@app/ForceLogin";
import Header from "@app/Header";
import { auth } from "@app/utils/auth";
import {
	serieABold,
	serieAMedium,
	serieANormal,
	serieASemiBold,
} from "@app/utils/fonts";
import loadMatchDays from "@app/utils/loadMatchDays";
import Image from "next/image";
import { Suspense } from "react";
import MatchDayTitle from "./MatchDayTitle";
import MatchesLoader from "./MatchesLoader";
import PredictionsStatus from "./PredictionsStatus";

const Predictions = async () => {
	void loadMatchDays();
	const session = await auth();

	if (!session?.user?.id) return <ForceLogin />;
	return (
		<>
			<Header session={session} title="PRONOSTICI" />
			<div className={`sm:px-4 lg:px-8 mb-28 ${serieANormal.className}`}>
				<div className="mx-6 sm:mx-4 mb-6 h-16 flex items-center">
					<Image
						alt="Serie A Enilive"
						src="https://img.legaseriea.it/vimages/6685b340/SerieA_ENILIVE_RGB.jpg"
						width={124}
						height={212}
						style={{ height: "64px" }}
						className="rounded-sm w-auto mr-4"
					/>
					<h2>
						<a
							className={`text-xl sm:text-2xl md:text-3xl hover:underline ${serieABold.className}`}
							style={{ color: "#00e8da" }}
							href="https://legaseriea.it/it/serie-a"
							target="_blank"
							tabIndex={-1}
						>
							SERIE A ENILIVE
						</a>
					</h2>
				</div>
				<div className="flex flex-col p-4 rounded-lg border-white border-opacity-20 lg:border lg:bg-zinc-700 lg:bg-opacity-25">
					<div className="flex justify-between items-end px-2">
						<div>
							<h3
								className={`${serieASemiBold.className} text-2xl mb-1`}
								style={{ color: "#00e8da" }}
							>
								<Suspense fallback={<>{"\u200b"}</>}>
									<MatchDayTitle />
								</Suspense>
							</h3>
							<Suspense
								fallback={
									<span className={`${serieAMedium.className} text-lg`}>
										{"\u200b"}
									</span>
								}
							>
								<PredictionsStatus userId={session.user.id} />
							</Suspense>
						</div>
						<span
							className={`hidden lg:block w-44 text-center mx-1 text-lg ${serieAMedium.className}`}
						>
							IL TUO PRONOSTICO
						</span>
					</div>
					<Suspense>
						<MatchesLoader userId={session.user.id} />
					</Suspense>
				</div>
			</div>
		</>
	);
};

export default Predictions;

export const runtime = "edge";
