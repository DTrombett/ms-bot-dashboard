import {
	Routes,
	type RESTGetAPICurrentUserResult,
} from "discord-api-types/v10";
import Image from "next/image";
import { rest } from "./rest";

const Avatar = async () => {
	const bot = (await rest.get(
		Routes.user("@me")
	)) as RESTGetAPICurrentUserResult;

	return (
		<Image
			alt="MS Bot avatar"
			src={
				bot.avatar == null
					? rest.cdn.defaultAvatar(
							bot.discriminator === "0"
								? Number(BigInt(bot.id) >> 22n) % 6
								: Number(bot.discriminator) % 5
					  )
					: rest.cdn.avatar(bot.id, bot.avatar, {
							size: 256,
							extension: "webp",
					  })
			}
			width={256}
			height={256}
			priority
			className="rounded-full w-32 h-auto"
		/>
	);
};

export default Avatar;
