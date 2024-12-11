import rss from '@astrojs/rss';
import { getDateSlug, rssPubDate } from '../utils/time';

const pubDate = rssPubDate();

const bdUrl = `https://buttondown.email/livejazzdayton/archive/live-jazz-dayton-newsletter-${getDateSlug(pubDate)}`;

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
      content: "Content"
    }],
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}