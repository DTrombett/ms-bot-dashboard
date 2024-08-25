import Background from "@images/background-blur.webp";
import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import "tailwindcss/tailwind.css";
import "./globals.css";
import { defaultNormal } from "./utils/fonts";

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
}>) => (
	<html lang="it">
		<body
			className={`${defaultNormal.className} flex flex-col min-h-screen text-white bg-zinc-800`}
		>
			<Image
				src={Background}
				alt="background"
				className="fixed h-screen w-screen opacity-25 object-cover -z-10"
			/>
			<Suspense>{children}</Suspense>
		</body>
	</html>
);

export default RootLayout;
