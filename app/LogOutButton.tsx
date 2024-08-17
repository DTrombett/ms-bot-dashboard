"use client";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { signOut } from "./actions";

const LogInButton = () => (
	<button
		className="flex items-center rounded-lg px-4 py-2 mx-2 w-40 justify-center transition-all duration-200 hover:scale-105 active:scale-100"
		style={{ backgroundColor: "#ED4245" }}
		onClick={() => signOut()}
	>
		<FontAwesomeIcon
			icon={faArrowRightFromBracket}
			className="inline w-7 h-7 mr-2"
		/>
		Log out
	</button>
);

export default memo(LogInButton);
