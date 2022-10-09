const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
const { marked } = require('marked');

const markdownToHtml = markdown => {
  return DOMPurify.sanitize(marked.parse(markdown));
}

module.exports = {
	markdownToHtml
}
