import React from "react";

export default function Spinner() {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: "#766DF4",
        WebkitMask:
          "radial-gradient(circle closest-side at 50% 40%, #0000 94%, #000)",
        transformOrigin: "50% 40%",
        animation: "spin 1s infinite linear",
      }}
    />
  );
}

// Global CSS (Add inside index.css or _app.js if using Next.js)
const styles = `
  @keyframes spin {
    100% { transform: rotate(1turn); }
  }
`;
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
