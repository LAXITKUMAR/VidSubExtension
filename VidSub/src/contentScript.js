// URL against which selected word will be searched, for now
const SEARCH_ENGINE_BASE_URL = `https://www.google.com/search`;

// Query selector for the main video
const mainVideoQuerySelector = ".video-stream.html5-main-video";
const captionContainerSelector = ".ytp-caption-window-container";
const captionSegmentSelector = `${captionContainerSelector} .ytp-caption-segment`;

// Video element in which video is playing
const videElem = document.querySelector(mainVideoQuerySelector);
/**
 * Check if the correct selector clicked
 * @param {*} target Target segment
 * @param {*} list List of all segments
 * @returns
 */
const checkIfCorrectSelectorClicked = (target, list = []) => {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i] === target) {
      return true;
    }
  }
  return false;
};

// Giving Credit to http://jsfiddle.net/83pu2hLg/2/ for initial code
const searchTerm = function (e) {
  const cationSegmentList =
    document.querySelectorAll(captionSegmentSelector) || [];

  if (e && !checkIfCorrectSelectorClicked(e.target, cationSegmentList)) {
    return;
  }
  // First pause the video
  videElem && videElem.pause();
  // Gets clicked on word (or selected text if text is selected)
  var t = "";
  if (window.getSelection && (sel = window.getSelection()).modify) {
    // Webkit, Gecko
    var s = window.getSelection();
    if (s.isCollapsed) {
      s.modify("move", "forward", "character");
      s.modify("move", "backward", "word");
      s.modify("extend", "forward", "word");
      t = s.toString();
      s.modify("move", "forward", "character"); //clear selection
    } else {
      t = s.toString();
    }
  } else if ((sel = document.selection) && sel.type != "Control") {
    // IE 4+
    var textRange = sel.createRange();
    if (!textRange.text) {
      textRange.expand("word");
    }
    // Remove trailing spaces
    while (/\s$/.test(textRange.text)) {
      textRange.moveEnd("character", -1);
    }
    t = textRange.text;
  }
  const SEARCH_URL = `${SEARCH_ENGINE_BASE_URL}?q=${t}+meaning`;
  window.open(SEARCH_URL);
};

// Initialize
document.addEventListener("click", searchTerm);
