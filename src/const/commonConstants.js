export const PLATFORMS = {
  YOUTUBE: "YOUTUBE",
  NETFLIX: "NETFLIX",
  PRIMEVIDEO: "PRIMEVIDEO",
};

export const HOST_PATTERNS = {
  [PLATFORMS.YOUTUBE]: [/.*youtube*/],
  [PLATFORMS.NETFLIX]: [/.*netflix*/],
  [PLATFORMS.PRIMEVIDEO]: [/.*primevideo*/],
};

export const SELECTORS = {
  [PLATFORMS.YOUTUBE]: {
    VIDEO: ".video-stream.html5-main-video",
    CAPTION_SEGMENT: ".ytp-caption-window-container .ytp-caption-segment",
  },
  [PLATFORMS.NETFLIX]: {
    VIDEO: ".VideoContainer video",
    CAPTION_SEGMENT: ".player-timedtext-text-container span",
  },
  [PLATFORMS.PRIMEVIDEO]: {
    VIDEO: ".webPlayerSDKContainer video",
    CAPTION_SEGMENT: "span.atvwebplayersdk-captions-text",
  },
};

// URL against which selected word will be searched, for now
export const SEARCH_ENGINE_BASE_URL = {
  GOOGLE: `https://www.google.com/search`,
  // More would come here
};
