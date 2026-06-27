import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

import { App } from "./app";
import "./styles.css";

registerSW({ immediate: true });

const root = document.querySelector<HTMLDivElement>("#root");

if (!root) {
  throw new Error("SALIGAN root element was not found");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
