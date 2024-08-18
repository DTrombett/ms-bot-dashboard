import { auth } from "@app/auth";
import ForceLogin from "@app/ForceLogin";

const Predictions = async () => {
	const session = await auth();

	if (!session) return <ForceLogin />;
	return <>Signed in</>;
};

export default Predictions;

export const runtime = "edge";
