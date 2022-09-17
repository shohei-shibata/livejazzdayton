const EleventyFetch = require("@11ty/eleventy-fetch");
const Image = require("@11ty/eleventy-img");
const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_API_TOKEN = process.env.TRELLO_API_TOKEN;
const params = `key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`;

async function fetchTrelloEvents() {
    const cardsUrl = `http://api.trello.com/1/lists/6325995217c6c700939f9740/cards?${params}`
    const cards = await EleventyFetch(cardsUrl, {
        type: "json"
    });
    const cardsFormatted = cards.map(async card => {
        const { 
            start, 
            end, 
            locationName, 
            locationAddress, 
            description,  
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

        console.log("IMAGE HTML: ", imageHtml);

        const eventFormatted = {
            title: card.name,
            permalink: "/events/first-thursday-jazz-jam/index.html",
            start: start,
            end: end,
            location: {
                name: locationName,
                address: locationAddress
            },
            description: description,
            image: imageHtml,
            artists: [
                "Kelli Campbell"
            ]
        }
        console.log("EVENT FORMATTED: ", eventFormatted);
        return eventFormatted;
    });
    return cardsFormatted;
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

        const eventFormatted = {
            title: card.name,
            // Need to generate permalink programatically
            permalink: "/events/first-thursday-jazz-jam/index.html",
            start: start,
            end: end,
            location: {
                name: locationName,
                address: locationAddress
            },
            description: description,
            image: imageHtml,
            artists: [
                "Kelli Campbell"
            ]
        }
        console.log("EVENT FORMATTED: ", eventFormatted);

        return eventFormatted;
    }));

}