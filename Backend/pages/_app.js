import React from "react";
import { useState } from "react";
import "../styles/global.css";
import ParentComponent from "../components/ParentComponent";

function MyApp({ Component, pageProps }) {
  const [asideOpen, setAsideOpen] = useState(false);
  const AsideClickOpen = () => {
    setAsideOpen(!asideOpen);
  };
  return (
    <>
      <ParentComponent appOpen={asideOpen} appAsideOpen={AsideClickOpen} />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
