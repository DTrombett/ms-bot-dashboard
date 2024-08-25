"use client";
import { faDiscord } from "@fortawesome/free-brands-svg-icons/faDiscord";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "./utils/actions";
import { defaultMedium } from "./utils/fonts";

const LogInButton = () => (
	<button
		className={`flex items-center rounded-lg px-4 py-2 text-lg my-4 transition-all duration-200 hover:scale-105 active:scale-100 ${defaultMedium.className}`}
		style={{ backgroundColor: "#5865F2" }}
		onClick={() => signIn("discord")}
	>
		<FontAwesomeIcon icon={faDiscord} className="inline w-8 h-8 mr-2" />
		<span>Accedi con Discord</span>
	</button>
);

export default LogInButton;
