# React Boilerplate for Dynamic Rendering

Reboil dynamic is educational purpose project that have simple easy to understand setup for SEO friendly React. Contain this feature:

1. Client Side Rendering
2. SEO Friendly (dynamic rendering using puppeter for screen reader user agent)
3. Fast Refresh!
4. New JSX Transform (no need to import React manually)
5. React Router V5
6. React Helmet to manage document head
7. Fastify as a web server
8. Tools configured: ESLint, Prettier, Typescript, Husky and Lint Staged.
9. Testing with Jest and React Testing Library
10. CSS Support with [vanilla-extract](https://github.com/seek-oss/vanilla-extract)!

How the dynamic rendering work:
1. Fastify check for user agent and type of the request (if its requesting document or assets) on every request.
2. If its crawler, access the webpage with headless chrome via puppeter and send the html. Some key point that need to take a note when we access our page in puppeter: 
    - we only request for resource that help DOM production (document, script, fetch, xhr)
    - we do not load analytic script as it could produce unintended pageviews and prevent executing unnecessary code. The list can be extend if we have other script that does not help for DOM production
3. If its regular user, serve as regular static client rendered page

If we ever want to change status code for server response to crawler. e.g: You have 404 page and does not want crawler to index because you return status code 200. With react-helmet, add meta tags:

```html
<meta name="render:status_code" content="4xx" />
```

server will check for this status code and replace default 200 code when you serve error page.

## Development
### Client
Run this script and start modify the code inside `/src/client`.
```sh
yarn server:dev
```
### Server
There is no hmr installed for server code development currently, so everytime we update code, we need to run this. Codes is inside `/src/server`.
```sh
yarn server:build && yarn server:start
```

## Scripts
Lists of script you can run within this project.
| Command (yarn or npm) | Description |
| --- | --- |
| `lint` | Lint all files |
| `prettier:format` | Format all files with prettier |
| `prettier:check` | Check codes format only without emmitting |
| `client:test` | Run test for client (frontend) codes |
| `client:dev` | Run client code in development mode with hmr and fast refresh |
| `client:build` | Build client codes for production to /dist/client |
| `client:build:analyze` | Build client and analyze bundle size |
| `client:check-types` | Client type checking |
| `server:build` | Build server codes for production to /dist/server |
| `server:start` | Start server, ideally run this after build |
| `server:check-types` | Server type checking |
| `validate` | Validate all code with type checking, prettier check and linter |
