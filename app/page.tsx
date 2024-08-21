import { faDiscord } from "@fortawesome/free-brands-svg-icons/faDiscord";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Luckiest_Guy, Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { auth } from "./auth";
import Avatar from "./Avatar";
import Header from "./Header";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";

const font = Luckiest_Guy({
	subsets: ["latin"],
	display: "swap",
	weight: "400",
});
const medium = Roboto({
	subsets: ["latin"],
	display: "swap",
	weight: "500",
});

const Home = async () => {
	const session = await auth();

	return (
		<>
			<Header session={session} />
			<div className="flex flex-1 flex-col justify-center items-center mb-16 min-h-full">
				<Suspense
					fallback={
						<div className="rounded-full w-32 h-32 bg-zinc-700 bg-opacity-50" />
					}
				>
					<Avatar />
				</Suspense>
				<span
					className={`text-5xl my-2 ${font.className}`}
					style={{ textShadow: "#0049FF 3px 3px" }}
				>
					MS BOT
				</span>
				{session ? (
					<div
						className={`flex sm:flex-row flex-col text-lg my-6 scale-110 lg:scale-100 ${medium.className}`}
					>
						<a
							href="https://discord.gg/hzkSbTY5VS"
							target="_blank"
							className="flex items-center rounded-lg px-4 py-2 m-2 w-40 justify-center transition-all duration-200 hover:scale-105 active:scale-100"
							style={{ backgroundColor: "#5865F2" }}
						>
							<FontAwesomeIcon
								icon={faDiscord}
								className="inline w-8 h-8 mr-2"
							/>
							Discord
						</a>
						<Link
							href="/predictions"
							className="flex items-center rounded-lg px-4 py-2 m-2 w-40 justify-center transition-all duration-200 hover:scale-105 active:scale-100"
							style={{ backgroundColor: "#1f8b4c" }}
						>
							<Image
								src="https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/26bd.svg"
								alt="soccer icon"
								className="inline w-7 h-7 mr-2"
								width={112}
								height={112}
								draggable={false}
							/>
							Pronostici
						</Link>
						<LogOutButton />
					</div>
				) : (
					<LogInButton />
				)}
			</div>
		</>
	);
};

export default Home;

export const runtime = "edge";
