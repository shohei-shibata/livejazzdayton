module.exports = {
  eleventyComputed: {
    title: data => {
      console.log("DATA", data.event);
      return `Event Details: ${data.event.title}`;
    }
  }
};