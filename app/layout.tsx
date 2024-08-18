import Background from "@images/background-blur.webp";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import { auth } from "./auth";
import "./globals.css";
import { rest } from "./rest";
import SmallLogInButton from "./SmallLogInButton";

const font = Roboto({ subsets: ["latin"], weight: "400", display: "swap" });
const description =
	"Dashboard per interagire con il bot della community MS! Entra nel server Discord tramite l'invito: https://discord.gg/5aE8gdrF8k";
const title = "MS Bot Dashboard";

export const metadata: Metadata = {
	applicationName: title,
	authors: [{ name: "D Trombett", url: "https://github.com/DTrombett" }],
	creator: "D Trombett",
	description,
	generator: "Next.js",
	icons: { icon: "/favicon.ico" },
	metadataBase: new URL("http://localhost:3000"),
	openGraph: {
		type: "website",
		countryName: "Italy",
		description,
		locale: "it",
		siteName: title,
		title,
	},
	title,
	twitter: {
		card: "summary_large_image",
		description,
		creator: "@dtrombett",
		title,
	},
};

const RootLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const session = await auth();

	return (
		<html lang="it">
			<body
				className={`${font.className} flex flex-col min-h-screen text-white bg-zinc-800`}
			>
				<Image
					src={Background}
					alt="background"
					className="absolute h-full w-full opacity-50 object-cover -z-10"
					quality={75}
					priority
				/>
				<div className="flex justify-end pt-6 pr-6">
					{session ? (
						session.user?.image ? (
							<Image
								src={session.user.image}
								width={128}
								height={128}
								alt="avatar"
								className="w-16 h-auto rounded-full"
								title={session.user.name ?? ""}
							/>
						) : (
							<Image
								src={rest.cdn.defaultAvatar(
									session.user?.id
										? Number(BigInt(session.user.id) >> 22n) % 6
										: 0
								)}
								width={128}
								height={128}
								alt="avatar"
								className="w-16 h-auto rounded-full"
								title={session.user?.name ?? ""}
							/>
						)
					) : (
						<SmallLogInButton />
					)}
				</div>
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
