import rss from "@astrojs/rss";
import {
  getDateSlug,
  rssPubDate,
  getFullDateString,
  getTimeString,
} from "../utils/time";
import sanitizeHtml from "sanitize-html";
import { getAllFutureEvents } from "../utils/trello";

const allEvents = await getAllFutureEvents();
const limit = 10;
allEvents.splice(limit);
const pubDate = rssPubDate();
const bdUrl = `https://buttondown.email/livejazzdayton/archive/live-jazz-dayton-newsletter-${getDateSlug(pubDate)}`;
const eventListing = allEvents.map(
  (event) =>
    `<h3><a href="https://livejazzdayton.com/events/${event.slug}">${event.name}</a></h3>
      <p>${getFullDateString(event.start)} ${getTimeString(event.start)} at ${event.locationName}</p>
    <hr/>`
);

const newsletterContent = `
<p>Hey there! This is the ${pubDate.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
})} edition of the Live Jazz Dayton Newsletter.</p>
<p>Here's the list of upcoming live jazz events in and around Dayton.</p>
<h2>Upcoming Events</h2>
${eventListing.join("")}
<p>Don't forget to check out <a href="https://livejazzdayton.com/events">https://livejazzdayton.com/events/</a> for the full listing.</p>
<p>Do you know of someone who may also enjoy receiving this newsletter? Then please forward this email to them. They can sign up through the "subscribe" link below.</p>
<p>Finally, please consider supporting my work! You can make a donation via <a href="https://buymeacoffee.com/shohei_shibata">Buy Me A Coffee</a>. It would be very much appreciated!</p>
<p>That's all for now. Have a wonderful weekend!</p>
<br/>
<p>Take care,</p>
<p>Shohei Shibata</p>
`;

export function GET(context) {
  return rss({
    // `<title>` field in output xml
    title: "The Live Jazz Dayton Newsletter",
    // `<description>` field in output xml
    description: "The latest listing of live jazz events in Dayton, Ohio",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    authorName: "Shohei Shibata",
    authorEmail: "shohei@livejazzdayton.com",
    items: [
      {
        title: `[Live Jazz Dayton] Newsletter ${pubDate.toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        )}`,
        link: bdUrl,
        pubDate: pubDate.toISOString(),
        id: bdUrl,
        content: sanitizeHtml(newsletterContent),
      },
    ],
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
