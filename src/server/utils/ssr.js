class Renderer {
  async initialize() {
    console.log('Initialize Browser');
    const browser = await require('puppeteer').launch({headless: true});

    browser.on('disconnected', () => {
      console.log('Browser disconnected, try to re-initialize');
      this.initialize();
    });

    // Initialize incognito browser
    this.browser = await browser.createIncognitoBrowserContext();
  }

  get isBrowserExist() {
    return !!this.browser;
  }

  async render(url) {
    const start = Date.now();
    const page = await this.browser.newPage();

    // 1. Intercept network requests.
    await page.setRequestInterception(true);

    page.on('request', (req) => {
      // 2. Ignore requests for resources that don't produce DOM
      // (images, stylesheets, media).
      const allowlist = ['document', 'script', 'xhr', 'fetch'];
      if (allowlist.indexOf(req.resourceType()) < 0) {
        return req.abort();
      }

      // Don't load Google Analytics lib requests so pageviews aren't 2x.
      const blocklist = [
        'www.google-analytics.com',
        '/gtag/js',
        'ga.js',
        'analytics.js',
      ];
      if (blocklist.find((regex) => req.url().match(regex))) {
        return req.abort();
      }

      // 3. Pass through all other requests.
      req.continue();
    });

    let response = null;

    try {
      response = await page.goto(url, {waitUntil: 'networkidle0'});
    } catch (error) {
      console.error(error);
    }

    if (!response) {
      console.error('response does not exist');
      // This should only occur when the page is about:blank. See
      // https://github.com/GoogleChrome/puppeteer/blob/v1.5.0/docs/api.md#pagegotourl-options
      await page.close();
      const ttRenderMs = Date.now() - start;
      return {status: 400, html: null, ttRenderMs};
    }

    // Disable access to compute metadata. See
    // https://cloud.google.com/compute/docs/storing-retrieving-metadata.
    if (response.headers()['metadata-flavor'] === 'Google') {
      await page.close();
      const ttRenderMs = Date.now() - start;
      return {status: 403, html: null, ttRenderMs};
    }

    // Set status to the initial server's response code. Check for a <meta
    // name="render:status_code" content="4xx" /> tag which overrides the status
    // code.
    let statusCode = response.status();
    const newStatusCode = await page
      .$eval('meta[name="render:status_code"]', (element) => {
        return parseInt(element.getAttribute('content') || '');
      })
      .catch(() => {});

    // On a repeat visit to the same origin, browser cache is enabled, so we may
    // encounter a 304 Not Modified. Instead we'll treat this as a 200 OK.
    if (statusCode === 304) {
      statusCode = 200;
    }
    // Original status codes which aren't 200 always return with that status
    // code, regardless of meta tags.
    if (statusCode === 200 && newStatusCode) {
      statusCode = newStatusCode;
    }

    const html = await page.content(); // serialized HTML of page DOM.
    const ttRenderMs = Date.now() - start;
    await page.close();

    return {html, status: statusCode, ttRenderMs};
  }
}

module.exports = new Renderer();
