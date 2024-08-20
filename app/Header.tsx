import type { Session } from "next-auth";
import { Luckiest_Guy } from "next/font/google";
import Image from "next/image";
import { rest } from "./rest";
import SmallLogInButton from "./SmallLogInButton";

const font = Luckiest_Guy({
	subsets: ["latin"],
	display: "swap",
	weight: "400",
});

const Header = ({
	session,
	title,
}: {
	session: Session | null;
	title?: string;
}) => (
	<>
		<h1
			className={`text-6xl mt-6 mb-8 w-full text-center ${font.className}`}
			style={{ textShadow: "#0049FF 2px 2px" }}
		>
			{title}
		</h1>
		{session ? (
			session.user?.image ? (
				<Image
					src={session.user.image}
					width={128}
					height={128}
					alt="avatar"
					className="w-16 h-auto rounded-full absolute right-6 top-6"
					title={session.user.name ?? ""}
				/>
			) : (
				<Image
					src={rest.cdn.defaultAvatar(
						session.user?.id ? Number(BigInt(session.user.id) >> 22n) % 6 : 0
					)}
					width={128}
					height={128}
					alt="avatar"
					className="w-16 h-auto rounded-full absolute right-6 top-6"
					title={session.user?.name ?? ""}
				/>
			)
		) : (
			<SmallLogInButton />
		)}
	</>
);

export default Header;
