import { lazy, Suspense } from 'react';
import ClassComponent from '../components/ClassComponent';
import FunctionComponent from '../components/FunctionComponent';

const LazyComponent = lazy(() => import('../components/LazyComponent'));

export default function Homepage(){
  return (
    <div>
      <ClassComponent />
      <FunctionComponent />
      <Suspense fallback={<div>loading</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  )
}