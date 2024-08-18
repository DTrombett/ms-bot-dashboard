import { faDiscord } from "@fortawesome/free-brands-svg-icons/faDiscord";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Routes,
	type RESTGetAPICurrentUserResult,
} from "discord-api-types/v10";
import { Luckiest_Guy, Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { auth } from "./auth";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";
import { rest } from "./rest";
import Header from "./Header";

const font = Luckiest_Guy({
	subsets: ["latin"],
	display: "swap",
	weight: "400",
});
const semiBold = Roboto({
	subsets: ["latin"],
	display: "swap",
	weight: "500",
});

const Home = async () => {
	const [session, bot] = await Promise.all([
		auth(),
		rest.get(Routes.user("@me")) as Promise<RESTGetAPICurrentUserResult>,
	]);

	return (
		<>
			<Header session={session} />
			<div className="flex flex-1 flex-col justify-center items-center mb-16 min-h-full">
				<Image
					alt="MS Bot avatar"
					src={
						bot.avatar == null
							? rest.cdn.defaultAvatar(
									bot.discriminator === "0"
										? Number(BigInt(bot.id) >> 22n) % 6
										: Number(bot.discriminator) % 5
							  )
							: rest.cdn.avatar(bot.id, bot.avatar, {
									size: 256,
									extension: "webp",
							  })
					}
					width={256}
					height={256}
					priority
					className="rounded-full w-32 h-auto"
				/>
				<span
					className={`text-5xl my-2 ${font.className}`}
					style={{ textShadow: "#0049FF 3px 3px" }}
				>
					MS BOT
				</span>
				{session ? (
					<div className={`flex text-lg my-6 ${semiBold.className}`}>
						<a
							href="https://discord.gg/hzkSbTY5VS"
							target="_blank"
							className="flex items-center rounded-lg px-4 py-2 mx-2 w-40 justify-center transition-all duration-200 hover:scale-105 active:scale-100"
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
							className="flex items-center rounded-lg px-4 py-2 mx-2 w-40 justify-center transition-all duration-200 hover:scale-105 active:scale-100"
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
