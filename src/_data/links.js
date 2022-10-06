const { 
		getAllCards,
    getAttachmentsByCardId
	} = require("../trello.js");
const slugify = require('slugify');

/*
JUST FOR REFERENCE IN CASE NEEDED IN THE FUTURE
const boardIdLinksAnnouncements = "632d73dfc435890468f6a2fc";
*/

const listIdLinks = "632d10c84c2e6705be8d7a3f";


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
		const cards = await getAllCards(listIdLinks);
    cards.sort((a, b) => {
      return new Date(a.due).getTime() - new Date(b.due).getTime();
    });
    return await Promise.all(cards.map(async card => {
      const attachments = await getAttachmentsByCardId(card.id);
      const name = card.name;
      const linkUrl = attachments[0] ? attachments[0].url : "Invalid URL";
      const description = card.desc;
      const dateUpdated = card.dateLastActivity;

      const formattedLink = {
          dateUpdated: dateUpdated,
          title: name,
          description: description,
          url: linkUrl
      }

      console.log("Link: ", formattedLink )

      return formattedLink;
    }));

}
