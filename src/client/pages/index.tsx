import {lazy, Suspense, VFC} from 'react';
import {Helmet} from 'react-helmet';

import ClassComponent from '../components/ClassComponent';
import FunctionComponent from '../components/FunctionComponent';

const LazyComponent = lazy(() => import('../components/LazyComponent'));

const Homepage: VFC = () => {
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
        <Suspense fallback={<div>loading</div>}>
          <LazyComponent />
        </Suspense>
      </div>
    </>
  );
};

export default Homepage;
