import type { Session } from "next-auth";
import Image from "next/image";
import SmallLogInButton from "./SmallLogInButton";
import { brandFont } from "./utils/fonts";
import rest from "./utils/rest";

const Header = ({
	session,
	title,
}: {
	session: Session | null;
	title?: string;
}) => (
	<>
		<h1
			className={`text-4xl sm:text-5xl lg:text-6xl mt-6 mb-8 w-full text-center ${brandFont.className}`}
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
					className="hidden sm:block sm:w-12 lg:w-16 h-auto rounded-full absolute right-6 top-6"
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
					className="hidden sm:block sm:w-12 lg:w-16 h-auto rounded-full absolute right-6 top-6"
					title={session.user?.name ?? ""}
				/>
			)
		) : (
			<SmallLogInButton />
		)}
	</>
);

export default Header;
