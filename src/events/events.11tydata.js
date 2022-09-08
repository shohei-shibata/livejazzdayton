module.exports = function() {
	return {
		layout: "event.liquid",
		tags: "events",
		eleventyComputed: {
			event: data => {
				const startTime = setTime(new Date(data["event-date"]), data["start-time"]);
				const endTime = setTime(new Date(data["event-date"]), data["end-time"]);
				const imagePath = data.image ? 
					`./src/images/${data.image}`
					:
					"./src/images/default-event-card-image.jpg";
				return {
					name: data.title,
					start: startTime,
					end: endTime,
					imagePath: imagePath,
					location: data.location
				};
			}
		}
	};
};

const setTime = (date, timeString) => {
	if (!timeString) {
		console.error(`Events data file: No timeString provided for date ${date}`);
		return;
	}
	const timeArray = timeString.split(":");
	const hours = timeArray[0];
	const minutes = timeArray[1];
	return new Date(
		date.getUTCFullYear(), 
		date.getUTCMonth(), 
		date.getUTCDate(),
		hours,
		minutes
	);
}

