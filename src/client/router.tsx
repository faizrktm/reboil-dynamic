import {lazy, Suspense, VFC} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

const Home = lazy(
  () => import(/* webpackChunkName: "homepage" */ './pages/index'),
);
const About = lazy(
  () => import(/* webpackChunkName: "about-page" */ './pages/about'),
);
const NotFound = lazy(
  () => import(/* webpackChunkName: "not-found-page" */ './pages/notfound'),
);

const Router: VFC = () => {
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
};

export default Router;
