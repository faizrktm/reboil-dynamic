import {VFC} from 'react';
import {Helmet} from 'react-helmet';

const About: VFC = () => {
  return (
    <>
      <Helmet>
        <title>React Boilerplate Dynamic Rendering</title>
        <meta
          name="description"
          content="This is the about page for ReactBoilerplate Dynamic Rendering"
        />
      </Helmet>
      <div>Im all about page.</div>
    </>
  );
};

export default About;
