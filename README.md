# React Boilerplate for Dynamic Rendering

   Reboil dynamic is educational purpose project that have simple easy to understand setup for SEO friendly React. Contain this feature:

1. Client Side Rendering
2. SEO Friendly (dynamic rendering using puppeter for crawlers such googlebot)
3. Fast Refresh!
4. New JSX Transform (no need to import React manually)
5. React Router V5
6. React Helmet to manage document head
7. Fastify as a web server
8. Static Analysis Tools Configured: ESLint, Prettier, Typescript, Husky and Lint Staged.

How the dynamic rendering work:
1. Fastify check for user agent and type of the request (if its requesting document or assets) on every request.
2. If its crawler, access the webpage with headless chrome via puppeter and send the html. Some key point that need to take a note when we access our page in puppeter: 
    - we only request for resource that help DOM production (document, script, fetch, xhr)
    - we do not load analytic script as it could produce unintended pageviews and prevent executing unnecessary code. The list can be extend if we have other script that does not help for DOM production
3. If its regular user, serve as regular static page

If we ever want to change status code for server response to crawler. e.g: You have 404 page and does not want crawler to index because you return status code 200. With react-helmet, add meta tags:

```html
<meta name="render:status_code" content="4xx" />
```

server will check for this status code and replace default 200 code when you serve error page.

## Installation
Make sure you have node 10.16.0 above for the server to run.

install the dependencies and devDependencies
```sh
$ yarn install
```
for development environments
```sh
$ yarn dev
```
for production environments
```sh
$ yarn build
$ yarn start
```
for analyzing production bundle size
```sh
$ yarn build:analyze
```
