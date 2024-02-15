require('dotenv').config()

const EleventyFetch = require("@11ty/eleventy-fetch");
const { markdownToHtml } = require("./markdownParser");
const { getFullDateString } = require('./time');

const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_API_TOKEN = process.env.TRELLO_API_TOKEN;

const params = `key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`;

const defaultDuration = '5m';

const approvedEventsBoardId = "6325991c66402801560c94dd";

const customFieldId = {
  artists: `63298eb14e9a4702d35dbd47`,
  website: `63298de3f0b71701cee74d9b`,
  tickets: `6333522eae22aa02e35a6c7c`,
  end: `63298d1230281c0434de7e2b`,
  duration: `65b2354348c7c7168e48ee14`,
}

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

const getCustomFieldDefinitionById = async (fieldId) => {
  const url = `http://api.trello.com/1/boards/${approvedEventsBoardId}/customFields?${params}`
	const res = await EleventyFetch(url, { 
    duration: defaultDuration,
    type: "json" });
  return res.find(field => {
    return field.id === fieldId
  });
}

const getAttachmentsByCardId = async (cardId) => {
	const url = `http://api.trello.com/1/cards/${cardId}/attachments?${params}`
	const res = await EleventyFetch(url, { 
    duration: defaultDuration,
    type: "json" });
  return res;
}

const getCustomFieldById = (card, customFieldId) => {
  return card.customFieldItems.find(field => {
    return field.idCustomField === customFieldId
  })
}

const getCustomFieldTextById = (card, customFieldId) => {
  const customField = getCustomFieldById(card, customFieldId)
  return customField?.value.text
}

const getCustomFieldNumberById = (card, customFieldId) => {
  const customField = getCustomFieldById(card, customFieldId)
  return customField?.value.number
}

const getCustomFieldDateById = (card, customFieldId) => {
  const customField = getCustomFieldById(card, customFieldId)
  return customField?.value.date
}

const getCustomFieldOptionValueById = async (card, customFieldId) => {
  const customField = getCustomFieldById(card, customFieldId)
  const fieldDef = await getCustomFieldDefinitionById(customFieldId)
  const { value : { text: text } } = fieldDef.options.find(option => 
    option.id === customField.idValue
  )
  return text
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
    start: card.due,
    end: getCustomFieldDateById(card, customFieldId.end),
    duration: getCustomFieldNumberById(card, customFieldId.duration),
    artists: getCustomFieldTextById(card, customFieldId.artists),
    links: {
      website: getCustomFieldTextById(card, customFieldId.website),
      tickets: getCustomFieldTextById(card, customFieldId.tickets),
    },
  }
  return trelloParsed;
}

const getImageUrl = async (cardId, attachmentId) => {
  if (!attachmentId || !cardId) return null;
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
  getCustomFieldDateById,
}
