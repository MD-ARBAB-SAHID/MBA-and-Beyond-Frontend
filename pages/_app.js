import "../styles/globals.css";
import { useState } from "react";
import Layout from "../components/Layout/Layout";
import Router from "next/router";
import LoadingSpinner from "../components/UI/LoadingSpinner";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  Router.events.on("routeChangeStart", (url) => {
    setIsLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setIsLoading(false);
  });
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
