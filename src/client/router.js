import {lazy, Suspense} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

const Home = lazy(() => import('./pages/index'));
const About = lazy(() => import('./pages/about'));
const NotFound = lazy(() => import('./pages/notfound'));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
