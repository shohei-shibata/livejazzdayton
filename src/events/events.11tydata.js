module.exports = function() {
	return {
		layout: "event.liquid",
		tags: "events",
		eleventyComputed: {
			googleApiKey: data => {
				return process.env.GOOGLE_API_KEY
			},
			event: data => {
				const eventDate = new Date(data.eventDate || data.startTime);
				const year = eventDate.getUTCFullYear();
				const month = eventDate.getUTCMonth();
				const date = eventDate.getUTCDate();
				const start = getHoursMinutes(data.startTime);
				const end = getHoursMinutes(data.endTime);
				const startTime = new Date(year, month, date, start.hours, end.minutes);
				const endTime = new Date(year, month, date, end.hours, end.minutes);
				const timezoneString = "America/New_York";
				const imagePath = data.image ? 
					`./src/images/${data.image}`
					:
					"./src/images/default-event-card-image.jpg";
				const googleMapsQueryString = data.location.address ?
					`${data.location.name} ${data.location.address}`
					:
					`${data.location.name} near Dayton Ohio`
				return {
					name: data.eventName,
					start: changeTimezone(startTime, timezoneString),
					end: changeTimezone(endTime, timezoneString),
					imagePath: imagePath,
					imageAltText: data.imageAltText,
					location: {
						...data.location,
						queryString: googleMapsQueryString
					}
				};
			}
		}
	};
};

const getHoursMinutes = (timeString) => {
	if (!timeString) {
		console.error(`getHoursMinutes: No timeString provided`);
		return {
			hours: undefined,
			minutes: undefined
		};
	}
	const timeArray = timeString.toString().split(":");
	const hours = timeArray[0];
	const minutes = timeArray[1];
	
	return {
		hours: hours,
		minutes: minutes
	};
}

const changeTimezone = (date, timezoneString) => {
	const newTimezone = new Date(new Date().toLocaleString("en-US", { timeZone: timezoneString })).getTime();
	const offset = newTimezone - new Date().getTime();
	return roundDate(new Date(date.getTime() - offset), 5);
}

const roundDate = (date = new Date(), minutes) => {
	const ms = minutes * 60 * 1000;
	return new Date(Math.round(date.getTime() / ms) * ms);
}
