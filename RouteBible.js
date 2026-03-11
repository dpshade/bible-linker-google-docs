const ROUTE_BIBLE_VERSION = "route_bible";
const ROUTE_BIBLE_DISPLAY_NAME = "Route Bible";

function ensureRouteBibleVersionList(bibleVersions) {
  const versions = Array.isArray(bibleVersions) ? bibleVersions.slice() : [];

  if (!versions.includes(ROUTE_BIBLE_VERSION)) {
    versions.push(ROUTE_BIBLE_VERSION);
  }

  return versions;
}

function withRouteBibleDestination(bibleData) {
  if (!bibleData || !bibleData.bibleVersions) return bibleData;

  bibleData.bibleVersions[ROUTE_BIBLE_VERSION] = {
    displayName: ROUTE_BIBLE_DISPLAY_NAME,
    padStart: {},
    urlFormat: ""
  };

  return bibleData;
}

function buildRouteBibleReference(bookName, chapterStart, verseStart, verseEnd, chapterEnd) {
  const start = `${chapterStart}:${verseStart}`;
  const hasChapterRange = Boolean(chapterEnd) && Number(chapterEnd) !== Number(chapterStart);
  const hasVerseRange = Boolean(verseEnd) && Number(verseEnd) !== Number(verseStart);

  let end = "";

  if (hasChapterRange) {
    end = `${chapterEnd}:${verseEnd}`;
  } else if (hasVerseRange) {
    end = `${verseEnd}`;
  }

  return `${bookName} ${end ? `${start}-${end}` : start}`.trim();
}

function buildRouteBibleUrl(referenceText, translation) {
  let url = `https://route.bible/?q=${encodeURIComponent(referenceText)}&utm_source=google_docs_linker&utm_medium=link`;

  if (translation) {
    url += `&v=${encodeURIComponent(translation)}`;
  }

  return url;
}

function applyUrlFormat(urlFormat, values) {
  return urlFormat
    .replace(/<<bookNum>>/g, values.bookNum)
    .replace(/<<chapterStart>>/g, values.chapterStart)
    .replace(/<<verseStart>>/g, values.verseStart)
    .replace(/<<verseEnd>>/g, values.verseEnd)
    .replace(/<<chapterEnd>>/g, values.chapterEnd)
    .replace(/<bookNameAbbr1>>/g, values.bookNameAbbr1)
    .replace(/<<bookNameAbbr2>>/g, values.bookNameAbbr2)
    .replace(/<<bookNameFull>>/g, values.bookNameFull);
}

if (typeof module !== "undefined") {
  module.exports = {
    ROUTE_BIBLE_DISPLAY_NAME,
    ROUTE_BIBLE_VERSION,
    applyUrlFormat,
    buildRouteBibleReference,
    buildRouteBibleUrl,
    ensureRouteBibleVersionList,
    withRouteBibleDestination
  };
}
