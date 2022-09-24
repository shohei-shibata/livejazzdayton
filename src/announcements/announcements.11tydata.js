module.exports = {
  eleventyComputed: {
    title: data => {
      return `Announcement: ${data.announcement.title}`;
    }
  }
};