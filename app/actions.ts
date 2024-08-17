"use server";
import { signIn as authSignIn, signOut as authSignOut } from "./auth";

export const signIn = async (...args: Parameters<typeof authSignIn>) =>
	authSignIn(...args);
export const signOut = async (...args: Parameters<typeof authSignOut>) =>
	authSignOut(...args);
