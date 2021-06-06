import {
  PLATFORMS,
  HOST_PATTERNS,
  SEARCH_ENGINE_BASE_URL,
  SELECTORS,
} from "../const/commonConstants";

/**
 * Get the platform on which video is played(YouTube, Netflix, PrimeVideo etc)
 * @returns Platform String
 */
export const getPlatform = () => {
  const hostname = window.location.hostname;
  for (const platform in PLATFORMS) {
    const patterns = HOST_PATTERNS[platform];
    for (let i = 0; i < patterns.length; i += 1) {
      if (patterns[i].test(hostname)) {
        return platform;
      }
    }
  }
  return;
};

/**
 * Get the search engine user
 * @returns
 */
const getSearchUrl = (text) => {
  // For now only google is supported but in future controlled by preference
  return `${SEARCH_ENGINE_BASE_URL.GOOGLE}?q=${text}+meaning`;
};

/**
 * Check if the correct selector clicked
 * @param {*} target Target segment
 * @param {*} list List of all segments
 * @returns
 */
export const checkIfCorrectSelectorClicked = (target, list = []) => {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i] === target) {
      return true;
    }
  }
  return false;
};

/**
 * Trim whitespace or unnecessary characters worm the word
 * @param {*} text
 * @returns
 */
export const trimText = (text = "") => {
  return text.replace(/^\s+|\?+|,|\.|\!|\s+$/gm, "");
};

export const getClickedWordForYoutube = () => {
  let word = "";
  let sel;
  if (window.getSelection && (sel = window.getSelection()).modify) {
    // Webkit, Gecko
    const s = window.getSelection();
    if (s.isCollapsed) {
      s.modify("move", "forward", "character");
      s.modify("move", "backward", "word");
      s.modify("extend", "forward", "word");
      word = s.toString();
      s.modify("move", "forward", "character"); //clear selection
    } else {
      word = s.toString();
    }
  } else if ((sel = document.selection) && sel.type != "Control") {
    // IE 4+
    const textRange = sel.createRange();
    if (!textRange.text) {
      textRange.expand("word");
    }
    // Remove trailing spaces
    while (/\s$/.test(textRange.text)) {
      textRange.moveEnd("character", -1);
    }
    word = textRange.text;
  }
  return word;
};

/**
 * Expand range to word
 * @param {*} range
 * @returns
 */
const expandRangeToWord = (range) => {
  while (range.startOffset > 0) {
    if (range.toString().indexOf(" ") === 0) {
      range.setStart(range.startContainer, range.startOffset + 1);
      break;
    }
    range.setStart(range.startContainer, range.startOffset - 1);
  }
  while (
    range.endOffset < range.endContainer.length &&
    range.toString().indexOf(" ") == -1
  ) {
    range.setEnd(range.endContainer, range.endOffset + 1);
  }
  return range.toString().trim();
};

/**
 * Get the clicked word
 * @param {*} e
 * @returns
 */
export const getClickedWord = (event, platform) => {
  let range;
  let word;
  if (platform === PLATFORMS.YOUTUBE) {
    word = getClickedWordForYoutube();
  } else if (document.body && document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToPoint(event.clientX, event.clientY);
    range.expand("word");
    word = range.text;
    // Firefox
  } else if (event.rangeParent && document.createRange) {
    range = document.createRange();
    range.setStart(event.rangeParent, event.rangeOffset);
    range.setEnd(event.rangeParent, event.rangeOffset);
    expandRangeToWord(range);
    word = range.toString();
    // Webkit
  } else if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY);
    expandRangeToWord(range);
    word = range.toString();
    // Firefox for events without rangeParent
  } else if (document.caretPositionFromPoint) {
    var caret = document.caretPositionFromPoint(event.clientX, event.clientY);
    range = document.createRange();
    range.setStart(caret.offsetNode, caret.offset);
    range.setEnd(caret.offsetNode, caret.offset);
    expandRangeToWord(range);
    word = range.toString();
    range.detach();
  }
  return word ? trimText(word) : null;
};

/**
 * Get the word being clicked and search it in the new tab
 * @param {*} e Event object
 * @returns
 */
export const searchTerm = (platform) =>
  function (e) {
    // Get the selector based on the platform
    const { VIDEO, CAPTION_SEGMENT } = SELECTORS[platform];

    // Video element in which video is playing
    const videElem = document.querySelector(VIDEO);
    const cationSegmentList = document.querySelectorAll(CAPTION_SEGMENT) || [];

    if (e && !checkIfCorrectSelectorClicked(e.target, cationSegmentList)) {
      return;
    }
    // First pause the video
    videElem && videElem.pause();
    // Gets clicked on word (or selected text if text is selected)
    const clickedWord = getClickedWord(e, platform);
    if (clickedWord) {
      const SEARCH_URL = getSearchUrl(clickedWord);
      window.open(SEARCH_URL);
    }
  };
