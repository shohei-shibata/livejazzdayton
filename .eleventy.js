// 11ty configuration
const Image = require("@11ty/eleventy-img")

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
		const y = dateObj.getUTCFullYear();
		const m = dateObj.getUTCMonth();
		const d = dateObj.getUTCDate();
		const day = dateObj.getUTCDay();
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

	config.addFilter("getShortMonth", function (d) {
		const dateObj = new Date(d);
		const m = dateObj.getUTCMonth();
		const months = [
			"JAN", "FEB", "MAR", "APR", "MAY", "JUN",
			"JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
		];
		return months[m];
	});

	config.addFilter("getDate", function (d) {
		const dateObj = new Date(d);
		return dateObj.getUTCDate();
	});

	config.addFilter("getDay", function (d) {
		const dateObj = new Date(d);
		const day = dateObj.getUTCDay();
		const DOTW = [
			"SUN", "MON", "TUE", "WED", 
			"THU", "FRI", "SAT"
		];
		return DOTW[day];
	});

	// SHORTCODES

	// Images - from https://www.brycewray.com/posts/2021/04/using-eleventys-official-image-plugin/
	config.addShortcode("image", function (
		src, alt, sizes="(min-width: 1024px) 100vw, 50vw"
	) {
		console.log(`Generating image(s) from:  ${src}`)
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
	
  // 11ty defaults
  return {
    dir: {
			input: 'src',
			output: 'build'
		}
  };

};
