import rss from '@astrojs/rss';
import { getDateSlug, rssPubDate, getFullDateString, getTimeString } from '../utils/time';
import sanitizeHtml from 'sanitize-html';
import { getAllFutureEvents } from '../utils/trello';

const allEvents = await getAllFutureEvents();
const limit = 5;
allEvents.splice(limit)

const pubDate = rssPubDate();

const bdUrl = `https://buttondown.email/livejazzdayton/archive/live-jazz-dayton-newsletter-${getDateSlug(pubDate)}`;

const newsletterContent = `
<p>Hey there! This is the ${getDateSlug(pubDate)} edition of the Live Jazz Dayton Newsletter.</p>
<p>Here's the list of upcoming live jazz events in our area. Don't forget to check out <a href="https://livejazzdayton.com">https://livejazzdayton.com</a> for more</p>
<h2>Upcoming Events</h2>
${allEvents.map(event => (
`<h3><a href="https://livejazzdayton.com/events/${event.slug}">${event.name}</a></h3>
  <p>${ getFullDateString(event.start) } ${ getTimeString(event.start) } at ${ event.locationName }</p>
  <hr/>`
))}
`

export function GET(context) {
  return rss({
    // `<title>` field in output xml
    title: 'The Live Jazz Dayton Newsletter',
    // `<description>` field in output xml
    description: 'The latest listing of live jazz events in Dayton, Ohio',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    authorName: "Shohei Shibata",
    authorEmail: "shohei@livejazzdayton.com",
    items: [{
      title: `[Live Jazz Dayton] Newsletter ${pubDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}`,
      link: bdUrl,
      pubDate: pubDate.toISOString(),
      id: bdUrl,
      content: sanitizeHtml(newsletterContent),
    }],
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}