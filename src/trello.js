const EleventyFetch = require("@11ty/eleventy-fetch");

const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_API_TOKEN = process.env.TRELLO_API_TOKEN;

const params = `key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`;

const getAllApprovedCards = async () => {
	const url = `http://api.trello.com/1/lists/6325995217c6c700939f9740/cards?${params}&customFieldItems=true`
	return await EleventyFetch(url, { type: "json" });
}

const parseCard = card => {
	// TO DO: get card.desc content from actual fields on the card
	console.log("PARSE: ", card);
	return {
		...JSON.parse(card.desc),
		cardId: card.id,
		name: card.name,
		imageId: card.cover.idAttachment,
	}
}

const getImageUrl = async (cardId, attachmentId) => {
	const url = `http://api.trello.com/1/cards/${cardId}/attachments/${attachmentId}?${params}`;
	const imageInfo = await EleventyFetch(url, { type: "json" });
	return `${imageInfo.url}?${params}`;
}

module.exports = {
	getAllApprovedCards,
	parseCard,
	getImageUrl
}
