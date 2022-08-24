// 11ty configuration
const
  dev = global.dev  = (process.env.ELEVENTY_ENV === 'development'),
  now = new Date();

module.exports = config => {
	config.setLiquidOptions({
    dynamicPartials: false,
    strictFilters: false, // renamed from `strict_filters` in Eleventy 1.0
  });

  config.addPassthroughCopy("src/assets");

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

	config.addFilter("lastUpdated", function () {
		const lastUpdate = new Date();
		return lastUpdate.toDateString();
	});
	
  // 11ty defaults
  return {
    dir: {
			input: 'src',
			output: 'build'
		}
  };

};
