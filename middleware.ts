export { auth as middleware } from "@app/utils/auth";

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
