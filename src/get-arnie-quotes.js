const { httpGet } = require('./mock-http-interface');

/**
 * @param {GetArnieQuotesInput} urls
 * @returns {ArnieQuoteResponse}
 */
const getArnieQuotes = async (urls) =>
  Promise.all(
    urls.map(async (url) => {
      const { status, body } = await httpGet(url);
      const { message } = JSON.parse(body);
      return { [status === 200 ? 'Arnie Quote' : 'FAILURE']: message };
    }),
  );

module.exports = {
  getArnieQuotes,
};
