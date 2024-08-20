import { memo } from "react";

const DateTime = ({ date }: { date: string }) => {
	const d = new Date(date);

	return (
		<span className="text-sm text-white text-opacity-80">
			{d.toLocaleDateString("it")}
			<br className="hidden lg:inline" />
			<span className="lg:hidden">, </span>
			{d.toLocaleTimeString("it")}
		</span>
	);
};

export default memo(DateTime);
