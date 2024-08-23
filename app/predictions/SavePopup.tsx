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
		{pending ? (
			<div className="flex rounded-lg px-4 py-2 ml-auto w-32 justify-center bg-green-800">
				<svg
					width="120"
					height="32"
					viewBox="0 0 120 32"
					xmlns="http://www.w3.org/2000/svg"
					fill="#fff"
				>
					<circle cx="20" cy="16" r="12">
						<animate
							attributeName="r"
							from="12"
							to="12"
							begin="0s"
							dur="0.75s"
							values="12;8;12"
							calcMode="linear"
							repeatCount="indefinite"
						/>
						<animate
							attributeName="fill-opacity"
							from="1"
							to="1"
							begin="0s"
							dur="0.75s"
							values="1;.5;1"
							calcMode="linear"
							repeatCount="indefinite"
						/>
					</circle>
					<circle cx="60" cy="16" r="10" fill-opacity="0.75">
						<animate
							attributeName="r"
							from="10"
							to="10"
							begin="0s"
							dur="0.75s"
							values="10;12;10;8;10"
							calcMode="linear"
							repeatCount="indefinite"
						/>
						<animate
							attributeName="fill-opacity"
							from="0.75"
							to="0.75"
							begin="0s"
							dur="0.75s"
							values=".75;1;.75;.5;.75"
							calcMode="linear"
							repeatCount="indefinite"
						/>
					</circle>
					<circle cx="100" cy="16" r="8" fill-opacity="0.5">
						<animate
							attributeName="r"
							from="8"
							to="8"
							begin="0s"
							dur="0.75s"
							values="8;12;8"
							calcMode="linear"
							repeatCount="indefinite"
						/>
						<animate
							attributeName="fill-opacity"
							from="0.5"
							to="0.5"
							begin="0s"
							dur="0.75s"
							values=".5;1;.5"
							calcMode="linear"
							repeatCount="indefinite"
						/>
					</circle>
				</svg>
			</div>
		) : (
			<input
				type="submit"
				value="Salva"
				className="flex cursor-pointer rounded-lg px-4 py-2 ml-auto w-32 justify-center transition-all duration-200 enabled:hover:scale-105 enabled:active:scale-100 disabled:bg-green-800"
				style={{ backgroundColor: "#1f8b4c" }}
				disabled={pending}
			/>
		)}
	</div>
);

export default memo(SavePopup);
