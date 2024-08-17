"use client";
import { faDiscord } from "@fortawesome/free-brands-svg-icons/faDiscord";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Roboto } from "next/font/google";
import { memo } from "react";
import { signIn } from "./actions";

const semiBold = Roboto({
	subsets: ["latin"],
	display: "swap",
	weight: "500",
});

const LogInButton = () => {
	return (
		<button
			className={`flex items-center rounded-lg px-4 py-2 text-lg my-6 transition-all duration-200 hover:scale-105 active:scale-100 ${semiBold.className}`}
			style={{ backgroundColor: "#5865F2" }}
			onClick={() => signIn("discord")}
		>
			<FontAwesomeIcon icon={faDiscord} className="inline w-8 h-8 mr-2" />
			<span>Accedi con Discord</span>
		</button>
	);
};

export default memo(LogInButton);
