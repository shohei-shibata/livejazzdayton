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
				const startTimeUTCValue = Date.UTC(year, month, date, start.hours, start.minutes);
				const startTime = addTimezoneOffset(new Date(startTimeUTCValue));
				const endTime = addTimezoneOffset(new Date(Date.UTC(year, month, date, end.hours, end.minutes)));
				const imagePath = data.image ? 
					`./src/images/${data.image}`
					:
					"./src/images/default-event-card-image.jpg";
				console.log("11tydata.js: ", month+1, date, start.hours, start.minutes, startTimeUTCValue, startTime.toUTCString());
				return {
					name: data.title,
					start: startTime.toUTCString(),
					end: endTime.toUTCString(),
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

const addTimezoneOffset = (date) => {
	const timezoneOffset = date.getTimezoneOffset();
	console.log("timezoneOffset: ", timezoneOffset);
	date.setTime(date.getTime() + (timezoneOffset*60*1000));
	return date;
}
