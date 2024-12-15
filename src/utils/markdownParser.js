import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
import { marked } from 'marked';

const markdownToHtml = markdown => {
  return DOMPurify.sanitize(marked.parse(markdown));
}

export {
	markdownToHtml
}
