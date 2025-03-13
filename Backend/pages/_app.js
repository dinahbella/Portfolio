import React from "react";
import Header from "../components/Header";
import "../styles/global.css";
import ParentComponent from "../components/ParentComponent";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ParentComponent />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
