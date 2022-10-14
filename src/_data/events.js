const { 
		getAllCards,
		parseEventCard,
		getImageUrl
	} = require("../js/trello.js");
const Image = require("@11ty/eleventy-img");
const slugify = require('slugify');
const { htmlToText } = require('html-to-text');
const { google, ics } = require("calendar-link");
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const listIdApprovedCards = "6325995217c6c700939f9740";

const changeTimezone = (date, timezoneString) => {
  if (!date) { return null }
  const newTimezone = new Date(new Date().toLocaleString("en-US", { timeZone: timezoneString })).getTime();
  const offset = newTimezone - new Date().getTime();
  return roundDate(new Date(new Date(date).getTime() + offset), 5);
}
const roundDate = (date = new Date(), minutes) => {
  const ms = minutes * 60 * 1000;
  return new Date(Math.round(new Date(date).getTime() / ms) * ms);
}
const getDateString = (value = new Date()) => {
  const timezoneString = "America/New_York";
  const dateObj = changeTimezone(value, timezoneString);
  const y = dateObj.getFullYear();
  const m = dateObj.getMonth();
  const d = dateObj.getDate();
  return `${y}-${m+1}-${d}`;
}

const getCalendarLinks = (title, start, end, address, description, streamLink) => {
  const event = {
    title: title,
    start: start,
    end: end,
    location: address,
    description: streamLink ? `${description}\n<a href="${streamLink}">Live Stream Link</a>` : description,
  };
  return {
    googleCalendar: google(event),
    ics: ics(event)
  }
};

const getIsToday = (value) => {
  const timezoneString = "America/New_York";
  const now = changeTimezone(new Date(), timezoneString);
  console.log("isToday: ", value, now)
  return (value - new Date())/36e+5 < 21;
}

module.exports = async function() {
		const cards = await getAllCards(listIdApprovedCards);
    cards.sort((a, b) => {
      return new Date(a.due).getTime() - new Date(b.due).getTime();
    });
    return await Promise.all(cards.map(async card => {
      const { 
        cardId,
        name,
        imageId,
        start, 
        end, 
        locationName, 
        locationAddress, 
        description,  
        artists,
        links
      } = await parseEventCard(card)
      const imageUrl = await getImageUrl(cardId, imageId);
      const imageOptions = { 
          formats: "jpeg",
          widths: [600, 900, 1500],
          urlPath: "/images/",
          outputDir: "./build/images/",
      };

      const metadata = await Image(imageUrl, imageOptions);
  
      let imageAttributes = {
          alt: "ALT TEXT",
          sizes: "(min-width: 1024px) 100vw, 50vw",
          loading: "lazy",
          decoding: "async",
      };

      const imageHtml = Image.generateHTML(metadata, imageAttributes);

      const locationNameEscaped = locationName ? 
        locationName.replace("&", "and")
        :
        "";

      const queryString = locationAddress ? 
          `${locationNameEscaped}, ${locationAddress}`
          :
          `${locationNameEscaped} near Dayton, Ohio`;

      const slug = `${getDateString(start)}-${slugify(card.name, {remove: /[*+~.()'"!:@]/g})}`

      const isToday = getIsToday(start);
      
      let artistsString = "";

      if (artists) {
        artistsString = artists.map((artist, index) => {
          if (index > 0) {
            return `, ${artist}`
          } else {
            return artist
          }
        });
      } 

      const { googleCalendar, ics } = getCalendarLinks(name, start, end, locationAddress, htmlToText(description), links.stream);

      const eventFormatted = {
          slug: slug,
          title: name,
          start: start,
          end: end,
          location: {
              name: locationName,
              address: locationAddress
          },
          links: {
            googleCalendar: googleCalendar,
            ics: ics,
            facebook: links.facebook && links.facebook.length > 0 ? links.facebook : null,
            website: links.website && links.website.length > 0 ? links.website : null,
            stream: links.stream && links.stream.length > 0 ? links.stream : null,
            tickets: links.tickets && links.tickets.length > 0 ? links.tickets : null,
          },
          streamEmbed: links.streamEmbed && links.streamEmbed.length > 0 ? links.streamEmbed : null,
          badges: [
            isToday ? "Today" : null
          ],
          description: description,
          image: imageHtml,
          artists: artists,
          artistsString: artistsString,
          googleMapsUrl: `https://maps.google.com/maps?q=${queryString.replaceAll(" ", "+")}`,
          googleMapsEmbed: `https://www.google.com/maps/embed/v1/search?q=${queryString.replaceAll(" ", "+")}&key=${GOOGLE_API_KEY}`
      }

      return eventFormatted;
    }));

}
