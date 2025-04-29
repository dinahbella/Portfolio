import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "../../components/Provider";
import BackToTopButton from "../../components/Top";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col bg-purple-700 text-white text-center py-4">
          Close Your eyes. This website is still under construction. Please
          check back later.
        </div>
        <main className="flex-grow">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" // Or "dark"
          />
          <Component {...pageProps} />
        </main>

        <BackToTopButton />
        <div className="flex flex-col bg-purple-700 text-white text-center py-4">
          Close Your eyes. This website is still under construction. Please
          check back later.
        </div>
      </div>
    </ThemeProvider>
  );
}
