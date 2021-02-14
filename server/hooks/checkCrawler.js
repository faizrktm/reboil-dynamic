const { userAgentPattern, excludeUrlPattern } = require('../constant');

async function checkCrawler(request, reply) {
  const { 
    headers: {
      host,
      ['user-agent']: userAgent 
    },
    url,
    protocol
  } = request;

  /**
   * Check if user agent is not crawler
   * or its trying to request assets (js, css, image, etc) instead of page
   * If so, break the process and continue serving static site
   */
  if(
    userAgent === undefined ||
    !userAgentPattern.test(userAgent) || 
    excludeUrlPattern.test(url)
  ) {
    return;
  }
  
  const { html, status, ttRenderMs } = await require('../utils/ssr')(`${protocol}://${host}${url}`);

  reply
    .code(status)
    .header('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`)
    .send(html);

  return reply;
}

module.exports = checkCrawler;