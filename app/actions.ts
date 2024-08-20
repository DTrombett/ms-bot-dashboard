"use server";
import { signIn as authSignIn, signOut as authSignOut } from "./auth";

export const signIn = async (...args: Parameters<typeof authSignIn>) =>
	authSignIn(...args) as Promise<never>;
export const signOut = async (...args: Parameters<typeof authSignOut>) =>
	authSignOut(...args) as Promise<never>;
export const sendPredictions = async (form: FormData) => {
	console.log(form.get("matchOfTheMatch"));
};
