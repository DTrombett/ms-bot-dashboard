import { REST } from "@discordjs/rest";
import { APIVersion } from "discord-api-types/v10";
import { env } from "process";

export const rest = new REST({ version: APIVersion }).setToken(
	env.DISCORD_TOKEN!
);
