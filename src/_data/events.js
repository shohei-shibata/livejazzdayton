const { 
		getAllCards,
		parseEventCard,
		getImageUrl
	} = require("../js/trello.js");
const Image = require("@11ty/eleventy-img");
const slugify = require('slugify');
const { htmlToText } = require('html-to-text');
const { google, ics } = require("calendar-link");
const { getDateSlug } = require("../js/time.js");
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const listIdApprovedCards = "6325995217c6c700939f9740";

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
  return (new Date(value) - new Date())/36e+5 < 21;
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
        duration,
        locationName, 
        locationAddress, 
        description,  
        artists,
        links,
        dateUpdated,
      } = await parseEventCard(card)

      // Set end time based on duration
      const defaultDuration = 2
      const end = new Date(start)
      end.setHours(end.getHours() + parseInt(duration || defaultDuration))

      // Process image data
      const imageUrl = await getImageUrl(cardId, imageId);
      const imageOptions = { 
          formats: "jpeg",
          widths: [600, 900, 1500],
          urlPath: "/images/",
          outputDir: "./build/images/",
      };
      const metadata = imageUrl ? await Image(imageUrl, imageOptions) : null;
      let imageAttributes = {
          alt: "ALT TEXT",
          sizes: "(min-width: 1024px) 100vw, 50vw",
          loading: "lazy",
          decoding: "async",
      };
      const imageHtml = imageUrl ? Image.generateHTML(metadata, imageAttributes) : null;

      // Process event location data
      const locationNameEscaped = locationName ? 
        locationName.replace("&", "and")
        :
        "";
      const queryString = locationAddress ? 
          `${locationNameEscaped}, ${locationAddress}`
          :
          `${locationNameEscaped} near Dayton, Ohio`;

      // Set event slug
      const slug = `${getDateSlug(start)}-${slugify(card.name, {remove: /[*+~.()'"!:@]/g})}`

      // Determine if event is happening today
      const isToday = getIsToday(start);
      
      // Parse artist name(s) into an array
      let artistsString = "";
      if (artists) {
        artistsString = artists.split(", ").map((artist, index) => {
          if (index > 0) {
            return `, ${artist}`
          } else {
            return artist
          }
        });
      } 

      // Create calendar links
      const { googleCalendar, ics } = getCalendarLinks(name, start, end, locationAddress, htmlToText(description), links.stream);

      // Format event data to be returned
      const eventFormatted = {
          slug: slug,
          dateUpdated: dateUpdated,
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
