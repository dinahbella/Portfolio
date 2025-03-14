import React from "react";
import { useState } from "react";
import "../styles/global.css";
import ParentComponent from "../components/ParentComponent";

function MyApp({ Component, pageProps }) {
  const [asideOpen, setAsideOpen] = useState(false);

  const handleAsideClick = () => {
    setAsideOpen(!asideOpen);
  };

  return (
    <>
      <ParentComponent appOpen={asideOpen} appAsideOpen={handleAsideClick} />
      <main>
        <div className={asideOpen ? "container" : "container active"}>
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}

export default MyApp;
