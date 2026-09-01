import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";

document.documentElement.classList.add("dark");

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("L'élément racine '#root' est introuvable dans le DOM.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        theme="dark"
        position="bottom-right"
        closeButton
        richColors
        toastOptions={{
          className: "bg-card border-border text-foreground shadow-lg",
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);