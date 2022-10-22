const { 
		getAllCards,
	} = require("../js/trello.js");
const slugify = require('slugify');
const { markdownToHtml } = require("../js/markdownParser");

const listIdAbout = "6353c673723e400424a1b14d";

module.exports = async function() {
		const cards = await getAllCards(listIdAbout);
    return await Promise.all(cards.map(card => {
      const name = card.name;
      const description = card.desc;
      
      const content = {
          title: name,
          content: markdownToHtml(description),
      }
      
      return content;
    }));

}
