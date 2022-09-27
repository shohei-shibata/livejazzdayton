const { 
		getAllCards,
		parseCard,
		getImageUrl
	} = require("../trello.js");
const Image = require("@11ty/eleventy-img");
const slugify = require('slugify');
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

const getCalendarLinks = (title, start, end, address, description) => {
  const event = {
    title: title,
    start: start,
    end: end,
    location: address,
    description: description
  };
  return {
    google: google(event),
    ics: ics(event)
  }
};

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
      } = await parseCard(card)
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

      const queryString = locationAddress ? 
          `${locationName}, ${locationAddress}`
          :
          `${locationName} near Dayton, Ohio`;

      const slug = `${getDateString(start)}-${slugify(card.name, {remove: /[*+~.()'"!:@]/g})}`
      
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
              facebook: links.facebook && links.facebook.length > 0 ? links.facebook : null,
              website: links.website && links.website.length > 0 ? links.website : null
          },
          description: description,
          image: imageHtml,
          artists: artists,
          artistsString: artistsString,
          calendarLinks: getCalendarLinks(name, start, end, locationAddress, description),
          googleMapsUrl: `https://maps.google.com/maps?q=${queryString.replaceAll(" ", "+")}`,
          googleMapsEmbed: `https://www.google.com/maps/embed/v1/search?q=${queryString.replaceAll(" ", "+")}&key=${GOOGLE_API_KEY}`
      }

      return eventFormatted;
    }));

}
