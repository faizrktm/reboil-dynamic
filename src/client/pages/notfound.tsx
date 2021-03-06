import {VFC} from 'react';
import {Helmet} from 'react-helmet';

const NotFound: VFC = () => {
  return (
    <>
      <Helmet>
        <title>404 Not Found</title>
        <meta name="render:status_code" content="404" />
      </Helmet>
      <div>404 not found</div>
    </>
  );
};

export default NotFound;
