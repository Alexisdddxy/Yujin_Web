import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "./pages/HomePage";
import { MicroblogPage } from "./pages/MicroblogPage";
import { OthersPage } from "./pages/OthersPage";
import { ProfilePage } from "./pages/ProfilePage";
import { VideosPage } from "./pages/VideosPage";
import "../styles.css";

const pages = {
  "index.html": HomePage,
  "basic-info.html": ProfilePage,
  "microblog.html": MicroblogPage,
  "bilibili.html": VideosPage,
  "others.html": OthersPage,
};

const fileName = window.location.pathname.split("/").pop() || "index.html";
const CurrentPage = pages[fileName] || HomePage;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CurrentPage />
  </StrictMode>,
);
