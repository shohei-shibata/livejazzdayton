const { 
		getAllCards,
    getCustomFieldDateById
	} = require("../js/trello.js");
const slugify = require('slugify');
const { markdownToHtml } = require("../js/markdownParser");

/*
JUST FOR REFERENCE IN CASE NEEDED IN THE FUTURE
const listIdLinks = "632d10c84c2e6705be8d7a3f";
*/

const listIdAnnoucements = "632ddd7b1ae6ac01f1b0e8f1";
const boardIdLinksAnnouncements = "632d73dfc435890468f6a2fc";
const customFieldIdPublishedAt = "632dddbccffd9102f850ed14";

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
		const cards = await getAllCards(listIdAnnoucements);
    cards.sort((a, b) => {
      dateA = getCustomFieldDateById(a, customFieldIdPublishedAt);
      dateB = getCustomFieldDateById(b, customFieldIdPublishedAt);
      return dateB - dateA;
    });
    return await Promise.all(cards.map(card => {
      const name = card.name;
      const description = card.desc;
      const dateUpdated = getCustomFieldDateById(card, customFieldIdPublishedAt);

      const slug = `${getDateString(dateUpdated)}-${slugify(card.name, {remove: /[*+~.()'"!:@]/g})}`
      
      const formattedAnnoucement = {
          slug: slug,
          dateUpdated: dateUpdated,
          title: name,
          content: markdownToHtml(description),
      }

      return formattedAnnoucement;
    }));

}
