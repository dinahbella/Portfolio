import SideBar from "@/components/SideBar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SideBar />
      <Component {...pageProps} />
    </>
  );
}
