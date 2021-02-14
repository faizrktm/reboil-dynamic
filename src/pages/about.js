import {Helmet} from "react-helmet";

export default function About(){
  return (
    <>
      <Helmet>
        <title>React Boilerplate Dynamic Rendering</title>
        <meta name="description" content="This is the about page for ReactBoilerplate Dynamic Rendering" />
      </Helmet>
      <div>
        Im all about page.
      </div>
    </>
  )
}