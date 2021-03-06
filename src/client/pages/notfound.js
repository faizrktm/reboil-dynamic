import {Helmet} from 'react-helmet';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 Not Found</title>
        <meta name="render:status_code" content="404" />
      </Helmet>
      <div>404 not found</div>
    </>
  );
}
