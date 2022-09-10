module.exports = function() {
	return {
		layout: "event.liquid",
		tags: "events",
		eleventyComputed: {
			event: data => {
				const eventDate = new Date(data["event-date"]);
				const year = eventDate.getUTCFullYear();
				const month = eventDate.getUTCMonth();
				const date = eventDate.getUTCDate();
				const start = getHoursMinutes(data["start-time"]);
				const end = getHoursMinutes(data["end-time"]);
				const startTime = new Date(year, month, date, start.hours, end.minutes);
				const endTime = new Date(year, month, date, end.hours, end.minutes);
				const timezoneString = "America/New_York";
				const imagePath = data.image ? 
					`./src/images/${data.image}`
					:
					"./src/images/default-event-card-image.jpg";
				console.log("11tydata.js: ", month+1, date, start.hours, start.minutes, startTime, changeTimezone(startTime, timezoneString));
				return {
					name: data.title,
					start: changeTimezone(startTime, timezoneString),
					end: changeTimezone(endTime, timezoneString),
					imagePath: imagePath,
					location: data.location
				};
			}
		}
	};
};

const getHoursMinutes = (timeString) => {
	if (!timeString) {
		console.error(`getHoursMinutes: No timeString provided`);
		return;
	}
	const timeArray = timeString.split(":");
	const hours = timeArray[0];
	const minutes = timeArray[1];
	
	return {
		hours: hours,
		minutes: minutes
	};
}

const changeTimezone = (date, timezoneString) => {
	return new Date(new Date(date).toLocaleString("en-US", { timeZone: timezoneString }));
}
