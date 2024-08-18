"use client";
import { useEffect } from "react";
import { signIn } from "./actions";

const ForceLogin = () => {
	useEffect(() => {
		signIn("discord").catch(console.error);
	}, []);
	return <></>;
};

export default ForceLogin;
