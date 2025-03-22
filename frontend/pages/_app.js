import Header from "@/components/Header";
import { ThemeProvider } from "@/components/Provider";
import "@/styles/globals.css";

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
        <main className="bg-gradient-to-br from-blue-500 via-teal-400 to-indigo-700 border-teal-300">
          <Component {...pageProps} />;
        </main>
      </ThemeProvider>
    </div>
  );
}
