import Header from "@/components/Header";
import { ThemeProvider } from "@/components/Provider";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/Top";
export default function App({ Component, pageProps }) {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {" "}
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
      <BackToTopButton />
      <Footer />
    </div>
  );
}
