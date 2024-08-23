import { defaultNormal } from "@app/utils/fonts";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons/faCircleExclamation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";

const SavePopup = ({ pending }: { pending: boolean }) => (
	<div
		className={`fadeFromBottom fixed flex items-center text-lg bottom-8 left-4 right-4 sm:left-8 sm:right-8 md:left-16 md:right-16 lg:left-40 lg:right-40 h-16 py-2 px-4 sm:px-8 shadow-lg shadow-zinc-900 rounded-lg bg-zinc-900 bg-opacity-90 ${defaultNormal.className}`}
	>
		<FontAwesomeIcon
			icon={faCircleExclamation}
			className="hidden sm:inline w-6 h-6 mr-4"
		/>
		<span className="mr-2 sm:mr-0">Ricorda di salvare</span>
		<span className="hidden sm:inline whitespace-pre"> quando hai finito!</span>
		<input
			type="submit"
			value="Salva"
			className="flex cursor-pointer rounded-lg px-4 py-2 ml-auto w-32 justify-center transition-all duration-200 enabled:hover:scale-105 enabled:active:scale-100 disabled:bg-green-800"
			style={{ backgroundColor: "#1f8b4c" }}
			disabled={pending}
		/>
	</div>
);

export default memo(SavePopup);
