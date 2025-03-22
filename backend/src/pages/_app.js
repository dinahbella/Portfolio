import { ThemeProvider } from "@/components/Provider";
import SideBar from "@/components/SideBar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SideBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
