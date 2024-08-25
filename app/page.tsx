import { faDiscord } from "@fortawesome/free-brands-svg-icons/faDiscord";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "@images/avatar.webp";
import Image from "next/image";
import Link from "next/link";
import Header from "./Header";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";
import { auth } from "./utils/auth";
import { brandFont, defaultMedium } from "./utils/fonts";

const Home = async () => {
	const session = await auth();

	return (
		<>
			<Header session={session} />
			<div className="flex flex-1 flex-col justify-center items-center mb-16 min-h-full">
				<Image
					alt="MS Bot avatar"
					src={Avatar}
					priority
					className="rounded-full w-32 h-auto"
				/>
				<span
					className={`text-5xl my-2 ${brandFont.className}`}
					style={{ textShadow: "#0049FF 3px 3px" }}
				>
					MS BOT
				</span>
				<span
					className={`${brandFont.className} text-xl text-center my-4 px-4 tracking-wide`}
				>
					Il bot ufficiale della community MS
				</span>
				{session ? (
					<div
						className={`flex sm:flex-row flex-col text-lg my-2 scale-110 lg:scale-100 ${defaultMedium.className}`}
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
