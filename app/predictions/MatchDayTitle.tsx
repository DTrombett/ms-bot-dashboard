import loadMatchDays from "@app/utils/loadMatchDays";

const MatchDayTitle = async () => {
	const matchDay = await loadMatchDays();

	return matchDay ? `${matchDay.description}ª Giornata` : "N/A";
};

export default MatchDayTitle;
