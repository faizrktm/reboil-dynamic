import * as React from 'react';
import {Helmet} from 'react-helmet';

import ClassComponent from '../components/ClassComponent';
import FunctionComponent from '../components/FunctionComponent';

const LazyComponent = React.lazy(() => import('../components/LazyComponent'));

const Homepage: React.VFC = () => {
  return (
    <>
      <Helmet>
        <title>React Boilerplate Dynamic Rendering</title>
        <meta
          name="description"
          content="This is the homepage for ReactBoilerplate Dynamic Rendering"
        />
      </Helmet>
      <div>
        <ClassComponent />
        <FunctionComponent />
        <React.Suspense fallback={<div>loading</div>}>
          <LazyComponent />
        </React.Suspense>
      </div>
    </>
  );
};

export default Homepage;
