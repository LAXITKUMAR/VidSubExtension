import { getPlatform, searchTerm } from "./utils/commonUtils";
import "./styles/youtube.scss";
import "./styles/netflix.scss";
import "./styles/primevideo.scss";

window.addEventListener("load", (event) => {
  const platform = getPlatform();
  if (platform) {
    // Initialize
    document.addEventListener("click", searchTerm(platform));
  }
});
