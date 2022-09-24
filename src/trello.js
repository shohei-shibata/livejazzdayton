const EleventyFetch = require("@11ty/eleventy-fetch");
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
const { marked } = require('marked');

const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_API_TOKEN = process.env.TRELLO_API_TOKEN;

const params = `key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`;

const approvedEventsBoardId = "6325991c66402801560c94dd";
const approvedEventsListId = "6325995217c6c700939f9740";

const getAllCards = async (listId) => {
	const url = `http://api.trello.com/1/lists/${listId}/cards?${params}&customFieldItems=true`
	return await EleventyFetch(url, { type: "json" });
}

const getVenueAddressById = async (cardId) => {
	const url = `http://api.trello.com/1/cards/${cardId}/address?${params}`
	const res = await EleventyFetch(url, { type: "json" });
  return res._value;
}

const getVenueNameById = async (cardId) => {
	const url = `http://api.trello.com/1/cards/${cardId}/locationName?${params}`
	const res = await EleventyFetch(url, { type: "json" });
  return res._value;
}

const getCustomFields = async (boardId) => {
  const url = `http://api.trello.com/1/boards/${boardId}/customFields?${params}`
	const res = await EleventyFetch(url, { type: "json" });
  return res.map(item => {
    return {
      name: item.name,
      id: item.id,
    };
  });
}

const getCustomFieldByName = async (card, fieldName) => {
  const customFields = await getCustomFields(approvedEventsBoardId);
  const idCustomField = customFields.filter(item => {
    return item.name === fieldName
  })[0].id;
  const customFieldFiltered = card.customFieldItems.filter(item => {
    return item.idCustomField === idCustomField
  });
  const customFieldValue = customFieldFiltered.length > 0 ?
    customFieldFiltered[0].value : null;
  const dateFields = ["Event Start", "Event End"];
  const isDate = dateFields.includes(fieldName);
  if (!customFieldValue) { return null };
  if (isDate) {
    return customFieldValue.date;
  } else if (fieldName === "Artists") {
    return customFieldValue.text.split(", ");
  } else {
    return customFieldValue.text;
  };
}

const markdownToHtml = markdown => {
  const html = DOMPurify.sanitize(marked.parse(markdown));
  return html;
}

const parseCard = async card => {
  const trelloParsed = {
    cardId: card.id,
    name: card.name,
    description: markdownToHtml(card.desc),
		imageId: card.cover.idAttachment,
    locationName: await getVenueNameById(card.id),
    locationAddress: await getVenueAddressById(card.id),
    start: await getCustomFieldByName(card, "Event Start"),
    end: await getCustomFieldByName(card, "Event End"),
    artists: await getCustomFieldByName(card, "Artists"),
    links: {
      facebook: await getCustomFieldByName(card, "Facebook"),
      website: await getCustomFieldByName(card, "Website"),
    }
  }
  return trelloParsed;
}

const getImageUrl = async (cardId, attachmentId) => {
	const url = `http://api.trello.com/1/cards/${cardId}/attachments/${attachmentId}?${params}`;
	const imageInfo = await EleventyFetch(url, { type: "json" });
	return `${imageInfo.url}?${params}`;
}

module.exports = {
	getAllCards,
	parseCard,
	getImageUrl
}
