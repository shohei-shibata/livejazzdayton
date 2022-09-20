// 11ty configuration
const Image = require("@11ty/eleventy-img");
const { google, ics } = require("calendar-link");

const
  dev = global.dev  = (process.env.ELEVENTY_ENV === 'development'),
  now = new Date();

module.exports = config => {
	const timezoneString = "America/New_York";
	const changeTimezone = (date, timezoneString) => {
		if (!date) { return null }
		const newTimezone = new Date(new Date().toLocaleString("en-US", { timeZone: timezoneString })).getTime();
		const offset = newTimezone - new Date().getTime();
		return roundDate(new Date(new Date(date).getTime() + offset), 5);
	};
	const roundDate = (date = new Date(), minutes) => {
		const ms = minutes * 60 * 1000;
		return new Date(Math.round(new Date(date).getTime() / ms) * ms);
	}

	config.setLiquidOptions({
		dynamicPartials: false,
		strictFilters: false, // renamed from `strict_filters` in Eleventy 1.0
	});

  config.addPassthroughCopy("src/assets");

	// COLLECTIONS

	config.addCollection("futureEvents", function(collectionApi) {
		return collectionApi.getFilteredByGlob("src/events/*.md")
			.filter( item => {
				const eventDate = new Date(item.data.eventDate);
				const yesterday = new Date(Date.now() - 864e5);
				return eventDate > yesterday;
			})
			.sort( (a, b) => {
				const dateA = new Date(a.data.eventDate);
				const dateB = new Date(b.data.eventDate);
				return dateA - dateB;
			});
	});

	config.addCollection("pastEvents", function(collectionApi) {
		return collectionApi.getFilteredByGlob("src/events/*.md")
			.filter( item => {
				const eventDate = new Date(item.data.eventDate);
				const today = new Date();
				return eventDate < today;
			})
			.sort( (a, b) => {
				const dateA = new Date(a.data.eventDate);
				const dateB = new Date(b.data.eventDate);
				return dateB - dateA;
			});
	});

	// FILTERS

	config.addFilter("lastUpdated", function () {
		const lastUpdate = new Date();
		return lastUpdate.toDateString();
	});

	config.addFilter("dateString", function (value) {
		if (!value) { return "No Date" }
		const dateObj = changeTimezone(value, timezoneString);
		const y = dateObj.getFullYear();
		const m = dateObj.getMonth();
		const d = dateObj.getDate();
		const day = dateObj.getDay();
		const months = [
			"January", "February", "March", 
			"April", "May", "June", "July",
			"August", "September", "October",
			"November", "December"
		];
		const DOTW = [
			"Sunday", "Monday", "Tuesday",
			"Wednesday", "Thursday", 
			"Friday", "Saturday"
		];
		return `${DOTW[day]}, ${months[m]} ${d}, ${y}`;
	});

	config.addFilter("timeString", function (value) {
		if (!value) { return "Invalid Time" };
		const dateObj = changeTimezone(new Date(value), timezoneString);
		const hoursBase24 = dateObj.getHours();
		let minutes = dateObj.getMinutes();
		const amPm = hoursBase24 < 12 ? "AM" : "PM";
		let hoursBase12 = hoursBase24 % 12;
		
		if (hoursBase12 === 0) {
			hoursBase12 = 12;
		};

		if (minutes === 0) {
			minutes = "00";
		};

		return `${hoursBase12}:${minutes}${amPm}`;
	});

	config.addFilter("getShortMonth", function (d) {
		if (!d) { return "Invalid Month" };
		const dateObj = changeTimezone(new Date(d), timezoneString);
		const m = dateObj.getMonth();
		const months = [
			"JAN", "FEB", "MAR", "APR", "MAY", "JUN",
			"JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
		];
		return months[m];
	});

	config.addFilter("getDate", function (d) {
		if (!d) { return "Invalid Date" };
		const dateObj = changeTimezone(new Date(d), timezoneString);
		return dateObj.getDate();
	});

	config.addFilter("getDay", function (d) {
		if (!d) { return "Invalid Date" };
		const dateObj = changeTimezone(new Date(d), timezoneString);
		const day = dateObj.getDay();
		const DOTW = [
			"SUN", "MON", "TUE", "WED", 
			"THU", "FRI", "SAT"
		];
		return DOTW[day];
	});

	config.addFilter("googleMapsSearchUrl", function (d) {
		if (!d) {
			return d;
		} else {
			return `https://maps.google.com/maps?q=${d.replaceAll(" ", "+")}`;
		}
	});

	// SHORTCODES

	// Images - from https://www.brycewray.com/posts/2021/04/using-eleventys-official-image-plugin/
	config.addShortcode("image", function (
		src="./src/images/default-event-card-image.jpg", alt="No alt text provided", sizes="(min-width: 1024px) 100vw, 50vw"
	) {
		console.log(`Generating image(s) from:  ${src}`);
		let options = {
			widths: [600, 900, 1500],
			formats: ["webp", "jpeg"],
			urlPath: "/images/",
			outputDir: "./build/images/",
			/*filenameFormat: function (id, src, width, format, options) {
				//const extension = path.extname(src)
				const name = path.basename(src, extension)
				return `${name}-${width}w.${format}`
			}*/
		}

		// generate images
		Image(src, options)

		let imageAttributes = {
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		}
		// get metadata
		metadata = Image.statsSync(src, options)
		return Image.generateHTML(metadata, imageAttributes)
	});

	config.addShortcode("cssBackgroundImage", function (src) {
		console.log(`Generating css background image from: ${src}`);
		let options = {
			widths: [1500],
			formats: ["jpeg"],
			urlPath: "/images/",
			outputDir: "./build/images/"
		}

		Image(src, options);

		metadata = Image.statsSync(src, options);

		return `background-image: url(${metadata.jpeg[0].url});`;
	})

	config.addShortcode("calendarLinks", function({
		name, start, end, location
	}) {
		const locationString = location ? 
			`${location.name}, ${location.address}`
			:
			"";
			
		const event = {
			title: name,
			start: start,
			end: end,
			location: locationString
		};

		return (
			`
				<a class="calendar-link btn-secondary" href=${google(event)}>Google Calendar</a>
				<a class="calendar-link btn-secondary" href=${ics(event)}>iCalendar</a>
			`
		);
		
	});
	
  // 11ty defaults
  return {
    dir: {
			input: 'src',
			output: 'build'
		}
  };

};
