// 11ty configuration
const Image = require("@11ty/eleventy-img");
const { google, ics } = require("calendar-link");

const
  dev = global.dev  = (process.env.ELEVENTY_ENV === 'development'),
  now = new Date();

module.exports = config => {
	config.setLiquidOptions({
    dynamicPartials: false,
    strictFilters: false, // renamed from `strict_filters` in Eleventy 1.0
  });

  config.addPassthroughCopy("src/assets");

	// COLLECTIONS

	config.addCollection("futureEvents", function(collectionApi) {
		return collectionApi.getFilteredByGlob("src/events/*.md")
			.filter( item => {
				const eventDate = new Date(item.data["event-date"]);
				const yesterday = new Date(Date.now() - 864e5);
				return eventDate > yesterday;
			})
			.sort( (a, b) => {
				const dateA = new Date(a.data["event-date"]);
				const dateB = new Date(b.data["event-date"]);
				return dateA - dateB;
			});
	});

	config.addCollection("pastEvents", function(collectionApi) {
		return collectionApi.getFilteredByGlob("src/events/*.md")
			.filter( item => {
				const eventDate = new Date(item.data["event-date"]);
				const today = new Date();
				return eventDate < today;
			})
			.sort( (a, b) => {
				const dateA = new Date(a.data["event-date"]);
				const dateB = new Date(b.data["event-date"]);
				return dateB - dateA;
			});
	});

	// FILTERS

	config.addFilter("lastUpdated", function () {
		const lastUpdate = new Date();
		return lastUpdate.toDateString();
	});

	config.addFilter("dateString", function (value) {
		const dateObj = new Date(value);
		console.log("dateString input: ", dateObj);
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
		const dateObj = new Date(value);
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
		const dateObj = new Date(d);
		const m = dateObj.getMonth();
		const months = [
			"JAN", "FEB", "MAR", "APR", "MAY", "JUN",
			"JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
		];
		return months[m];
	});

	config.addFilter("getDate", function (d) {
		const dateObj = new Date(d);
		return dateObj.getDate();
	});

	config.addFilter("getDay", function (d) {
		const dateObj = new Date(d);
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

		console.log("calendarLinks: ", event);

		return (
			`
				<a href=${google(event)}>Google Calendar</a>
				<a href=${ics(event)}>iCalendar</a>
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
