import EleventyFetch from "@11ty/eleventy-fetch";
import { markdownToHtml } from "./markdownParser.js";
import slugify from 'slugify';
import { getDateSlug } from "./time.js";

const TRELLO_API_KEY = import.meta.env.TRELLO_API_KEY;
const TRELLO_API_TOKEN = import.meta.env.TRELLO_API_TOKEN;

const params = `key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`;

const approvedEventsBoardId = "6325991c66402801560c94dd";
const listIdApprovedCards = "6325995217c6c700939f9740";

const customFieldId = {
  artists: `63298eb14e9a4702d35dbd47`,
  website: `63298de3f0b71701cee74d9b`,
  tickets: `6333522eae22aa02e35a6c7c`,
  start: `63298cde0d12540117f3fa32`,
  end: `63298d1230281c0434de7e2b`,
  duration: `65b2354348c7c7168e48ee14`,
}

const defaultDuration = '10h';

const getAllCards = async (listId) => {
	const url = `http://api.trello.com/1/lists/${listId}/cards?${params}&customFieldItems=true`
  return await EleventyFetch(url, { 
    duration: defaultDuration,
    type: "json" 
  });
}

const getAllFutureEvents = async() => {
  return await Promise.all((await getAllCards(listIdApprovedCards)).map(async event => await parseEventCard(event)))
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

const parseEventCard = async card => {
  const start = getCustomFieldDateById(card, customFieldId.start)
  return {
    cardId: card.id,
    name: card.name,
    description: markdownToHtml(card.desc),
    dateUpdated: card.dateLastActivity,
		imageId: card.cover.idAttachment,
    locationName: await getVenueNameById(card.id),
    locationAddress: await getVenueAddressById(card.id),
    start,
    end: getCustomFieldDateById(card, customFieldId.end),
    duration: getCustomFieldNumberById(card, customFieldId.duration),
    artists: getCustomFieldTextById(card, customFieldId.artists),
    websiteUrl: getCustomFieldTextById(card, customFieldId.website),
    ticketsUrl: getCustomFieldTextById(card, customFieldId.tickets),
    slug: `${getDateSlug(start)}-${slugify(card.name, {remove: /[*+~.()'"!:@]/g})}`
  }
}

const getImageUrl = async (cardId, attachmentId) => {
  if (!attachmentId || !cardId) return null;
	const url = `http://api.trello.com/1/cards/${cardId}/attachments/${attachmentId}?${params}`;
	const imageInfo = await EleventyFetch(url, { 
    duration: defaultDuration,
    type: "json" });
	return `${imageInfo.url}?${params}`;
}

export {
	getAllCards,
  getAllFutureEvents
};
