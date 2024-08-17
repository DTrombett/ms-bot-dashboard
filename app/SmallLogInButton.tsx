"use client";
import { Roboto } from "next/font/google";
import { memo } from "react";
import { signIn } from "./actions";

const semiBold = Roboto({
	subsets: ["latin"],
	display: "swap",
	weight: "500",
});

const LogInButton = () => (
	<button
		className={`flex items-center rounded px-7 py-3 mt-2 text-lg transition-all duration-200 hover:opacity-90 ${semiBold.className}`}
		style={{ backgroundColor: "#5865F2" }}
		onClick={() => signIn("discord")}
	>
		<span>Log In</span>
	</button>
);

export default memo(LogInButton);
