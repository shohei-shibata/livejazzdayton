module.exports = {
  eleventyComputed: {
    title: data => {
      return `Event Details: ${data.event.title}`;
    }
  }
};