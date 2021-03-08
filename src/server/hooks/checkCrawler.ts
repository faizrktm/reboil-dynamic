import {FastifyRequest, FastifyReply} from 'fastify';

import {userAgentPattern, excludeUrlPattern} from '../constant';
import SSR from '../utils/ssr';

async function checkCrawler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
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
}

export default checkCrawler;
