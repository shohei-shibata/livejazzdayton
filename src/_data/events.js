const EleventyFetch = require("@11ty/eleventy-fetch");
const Image = require("@11ty/eleventy-img");
const slugify = require('slugify')
const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_API_TOKEN = process.env.TRELLO_API_TOKEN;
const params = `key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

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

module.exports = async function() {
    const cardsUrl = `http://api.trello.com/1/lists/6325995217c6c700939f9740/cards?${params}`
    const cards = await EleventyFetch(cardsUrl, {
        type: "json"
    });
    return await Promise.all(cards.map(async card => {
        const { 
            start, 
            end, 
            locationName, 
            locationAddress, 
            description,  
            artists
        } = JSON.parse(card.desc)
        const imageInfo = await EleventyFetch(
            `http://api.trello.com/1/cards/${card.id}/attachments/${card.cover.idAttachment}?${params}`,
            {
                type: "json"
            }
        );
        const imageUrl = `${imageInfo.url}?${params}`;
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

        const slug = `${getDateString(start)}-${slugify(card.name)}`
        
        const eventFormatted = {
            slug: slug,
            title: card.name,
            start: start,
            end: end,
            location: {
                name: locationName,
                address: locationAddress
            },
            description: description,
            image: imageHtml,
            artists: artists,
            googleMapsUrl: `https://maps.google.com/maps?q=${queryString.replaceAll(" ", "+")}`,
            googleMapsEmbed: `https://www.google.com/maps/embed/v1/search?q=${queryString.replaceAll(" ", "+")}&key=${GOOGLE_API_KEY}`
        }
        console.log("EVENT FORMATTED: ", eventFormatted);

        return eventFormatted;
    }));

}