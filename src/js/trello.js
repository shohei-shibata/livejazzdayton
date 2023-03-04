const EleventyFetch = require("@11ty/eleventy-fetch");
const { markdownToHtml } = require("./markdownParser");

const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_API_TOKEN = process.env.TRELLO_API_TOKEN;

const params = `key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`;

const defaultDuration = '1m';

const approvedEventsBoardId = "6325991c66402801560c94dd";

const getAllCards = async (listId) => {
	const url = `http://api.trello.com/1/lists/${listId}/cards?${params}&customFieldItems=true`
	return await EleventyFetch(url, { 
    duration: "1h",
    type: "json" 
  });
}

const getVenueAddressById = async (cardId) => {
	const url = `http://api.trello.com/1/cards/${cardId}/address?${params}`
	const res = await EleventyFetch(url, { 
    duration: defaultDuration,
    type: "json" });
  return res._value;
}

const getVenueNameById = async (cardId) => {
	const url = `http://api.trello.com/1/cards/${cardId}/locationName?${params}`
	const res = await EleventyFetch(url, { 
    duration: defaultDuration,
    type: "json" });
  return res._value;
}

const getCustomFields = async (boardId) => {
  const url = `http://api.trello.com/1/boards/${boardId}/customFields?${params}`
	const res = await EleventyFetch(url, { 
    duration: defaultDuration,
    type: "json" });
  return res.map(item => {
    return {
      name: item.name,
      id: item.id,
    };
  });
}

const getAttachmentsByCardId = async (cardId) => {
	const url = `http://api.trello.com/1/cards/${cardId}/attachments?${params}`
	const res = await EleventyFetch(url, { 
    duration: defaultDuration,
    type: "json" });
  return res;
}

const getCustomFieldByName = async (boardId, card, fieldName) => {

  const customFields = await getCustomFields(boardId);
  const customField = customFields.filter(item => {
    return item.name === fieldName
  });
  const idCustomField = customField.length > 0 ? customField[0].id : null;
  const customFieldFiltered = card.customFieldItems.filter(item => {
    return item.idCustomField === idCustomField
  });
  const customFieldValue = customFieldFiltered.length > 0 ?
    customFieldFiltered[0].value : null;
  const dateFields = ["Event Start", "Event End", "Published"];
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

const parseEventCard = async card => {
  const trelloParsed = {
    cardId: card.id,
    name: card.name,
    description: markdownToHtml(card.desc),
    dateUpdated: card.dateLastActivity,
		imageId: card.cover.idAttachment,
    locationName: await getVenueNameById(card.id),
    locationAddress: await getVenueAddressById(card.id),
    start: await getCustomFieldByName(approvedEventsBoardId, card, "Event Start"),
    end: await getCustomFieldByName(approvedEventsBoardId, card, "Event End"),
    artists: await getCustomFieldByName(approvedEventsBoardId, card, "Artists"),
    links: {
      facebook: await getCustomFieldByName(approvedEventsBoardId, card, "Facebook"),
      website: await getCustomFieldByName(approvedEventsBoardId, card, "Website"),
      stream: await getCustomFieldByName(approvedEventsBoardId, card, "Stream Link"),
      tickets: await getCustomFieldByName(approvedEventsBoardId, card, "Tickets"),
    },
    streamEmbed: await getCustomFieldByName(approvedEventsBoardId, card, "Stream Embed")
  }
  return trelloParsed;
}

const getImageUrl = async (cardId, attachmentId) => {
	const url = `http://api.trello.com/1/cards/${cardId}/attachments/${attachmentId}?${params}`;
	const imageInfo = await EleventyFetch(url, { 
    duration: defaultDuration,
    type: "json" });
	return `${imageInfo.url}?${params}`;
}

module.exports = {
	getAllCards,
	parseEventCard,
	getImageUrl,
  getAttachmentsByCardId,
  getCustomFieldByName,
}
