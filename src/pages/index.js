import { lazy, Suspense } from 'react';
import {Helmet} from "react-helmet";

import ClassComponent from '../components/ClassComponent';
import FunctionComponent from '../components/FunctionComponent';

const LazyComponent = lazy(() => import('../components/LazyComponent'));

export default function Homepage(){
  return (
    <>
      <Helmet>
        <title>React Boilerplate Dynamic Rendering</title>
        <meta name="description" content="This is the homepage for ReactBoilerplate Dynamic Rendering" />
      </Helmet>
      <div>
        <ClassComponent />
        <FunctionComponent />
        <Suspense fallback={<div>loading</div>}>
          <LazyComponent />
        </Suspense>
      </div>
    </>
  )
}