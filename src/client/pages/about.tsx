import {VFC} from 'react';
import {Helmet} from 'react-helmet';
import AboutComponent from '../components/about/AboutComponent';

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
      <AboutComponent />
    </>
  );
};

export default About;
