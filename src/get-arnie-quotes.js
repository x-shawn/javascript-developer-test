const { httpGet } = require('./mock-http-interface');

const HTTP_OK = 200;

/** The single key of each result object. */
const ResultKey = Object.freeze({
  QUOTE: 'Arnie Quote',
  FAILURE: 'FAILURE',
});

/**
 * Fetches one url and maps its response to a single-key result object.
 * `httpGet` never rejects, so a non-200 status is a result, not an exception.
 * @param {string} url
 */
const fetchQuote = async (url) => {
  const { status, body } = await httpGet(url);
  const { message } = JSON.parse(body);
  const key = status === HTTP_OK ? ResultKey.QUOTE : ResultKey.FAILURE;
  return { [key]: message };
};

/**
 * @param {GetArnieQuotesInput} urls
 * @returns {ArnieQuoteResponse}
 */
const getArnieQuotes = async (urls) => {
  const fetching = urls.map(fetchQuote);
  return Promise.all(fetching);
};

module.exports = {
  getArnieQuotes,
};
