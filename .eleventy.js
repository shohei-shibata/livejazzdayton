// 11ty configuration
const
  dev = global.dev  = (process.env.ELEVENTY_ENV === 'development'),
  now = new Date();

module.exports = config => {
	config.setLiquidOptions({
    dynamicPartials: false,
    strictFilters: false, // renamed from `strict_filters` in Eleventy 1.0
  });

  config.addPassthroughCopy("assets");

  // 11ty defaults
  return {

    dir: {
      input: 'src',
      output: 'build'
    }

  };
};
