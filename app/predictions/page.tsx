import { auth } from "@app/auth";
import ForceLogin from "@app/ForceLogin";
import Header from "@app/Header";
import { Luckiest_Guy } from "next/font/google";

const font = Luckiest_Guy({
	subsets: ["latin"],
	display: "swap",
	weight: "400",
});

const Predictions = async () => {
	const session = await auth();

	if (!session) return <ForceLogin />;
	return (
		<>
			<Header session={session} title="PRONOSTICI" />
		</>
	);
};

export default Predictions;

export const runtime = "edge";
