import { redirect, RedirectType } from "next/navigation";

const NotFound = () => {
	redirect("https://youtu.be/dQw4w9WgXcQ", RedirectType.replace);
};

export default NotFound;

export const runtime = "edge";
