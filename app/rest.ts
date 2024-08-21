import { REST, type ResponseLike } from "@discordjs/rest";
import { APIVersion } from "discord-api-types/v10";
import { env } from "process";

export const rest = new REST({
	version: APIVersion,
	makeRequest: (url, init) =>
		fetch(url, {
			...(init as RequestInit),
			next: { revalidate: Infinity },
		}) as Promise<ResponseLike>,
}).setToken(env.DISCORD_TOKEN!);
