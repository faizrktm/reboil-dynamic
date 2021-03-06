const {userAgentPattern, excludeUrlPattern} = require('../constant');
const SSR = require('../utils/ssr');

async function checkCrawler(request, reply) {
  const {
    headers: {host, ['user-agent']: userAgent},
    url,
    protocol,
  } = request;

  /**
   * Check if user agent is not crawler
   * or its trying to request assets (js, css, image, etc) instead of page
   * If so, break the process and continue serving static site
   */
  if (
    userAgent === undefined ||
    !userAgentPattern.test(userAgent) ||
    excludeUrlPattern.test(url)
  ) {
    return;
  }

  if (!SSR.isBrowserExist) {
    await SSR.initialize();
  }

  const {html, status, ttRenderMs} = await SSR.render(
    `${protocol}://${host}${url}`,
  );

  reply
    .code(status)
    .header(
      'Server-Timing',
      `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`,
    )
    .header('Content-Type', 'text/html; charset=UTF-8')
    .send(html);

  return reply;
}

module.exports = checkCrawler;
