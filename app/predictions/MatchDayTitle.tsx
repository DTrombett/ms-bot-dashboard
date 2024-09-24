import loadMatchDay from "@app/utils/loadMatchDay";

const MatchDayTitle = async () => {
	const matchDay = await loadMatchDay();

	return matchDay ? `${matchDay.description}ª Giornata` : "N/A";
};

export default MatchDayTitle;
