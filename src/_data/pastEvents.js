const { 
		getAllCards,
		parseEventCard,
		getImageUrl
	} = require("../js/trello.js");
const Image = require("@11ty/eleventy-img");
const slugify = require('slugify');
const { getDateSlug } = require("../js/time.js");
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const listIdPastEventsCards = "63da437db4d363b4c0bb1e01";

module.exports = async function() {
		const cards = await getAllCards(listIdPastEventsCards);
    cards.sort((a, b) => {
      return new Date(b.due).getTime() - new Date(a.due).getTime();
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
