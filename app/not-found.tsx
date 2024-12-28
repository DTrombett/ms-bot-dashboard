import { redirect } from "next/navigation";

const NotFound = () => {
	redirect("https://youtu.be/dQw4w9WgXcQ");
	return <></>;
};

export default NotFound;

export const runtime = "edge";
