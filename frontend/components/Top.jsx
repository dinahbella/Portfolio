import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);

      // Toggle button visibility
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Progress bar at top of page */}
      <div
        className="fixed top-0 left-0 h-1.5 bg-blue-500 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Back to top button */}
      <div className="fixed bottom-6 right-6 z-50">
        {isVisible && (
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-900 transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex flex-col items-center"
          >
            <ArrowUp className="h-5 w-5" />
            <span className="text-sm mt-1">{Math.round(scrollProgress)}%</span>
          </button>
        )}
      </div>
    </>
  );
};

export default BackToTopButton;
