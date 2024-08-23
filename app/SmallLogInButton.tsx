"use client";
import { signIn } from "./utils/actions";
import { defaultMedium } from "./utils/fonts";

const SmallLogInButton = () => (
	<button
		className={`flex items-center rounded px-7 py-3 mt-6 text-lg transition-all duration-200 hover:opacity-90 absolute right-6 ${defaultMedium.className}`}
		style={{ backgroundColor: "#5865F2" }}
		onClick={() => signIn("discord")}
	>
		<span>Log In</span>
	</button>
);

export default SmallLogInButton;
