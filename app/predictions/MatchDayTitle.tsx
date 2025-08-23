import loadMatchDay from "@app/utils/loadMatchDay";

const MatchDayTitle = async () => {
	const matchDay = await loadMatchDay();

	return matchDay ? `${matchDay.title.split(" ")[1]}ª Giornata` : "N/A";
};

export default MatchDayTitle;
