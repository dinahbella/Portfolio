import Header from "@/components/Header";
import { ThemeProvider } from "@/components/Provider";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/Top";
import { Toaster } from "@/components/ui/sonner";

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
        <main>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
      <BackToTopButton />
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />{" "}
    </div>
  );
}
