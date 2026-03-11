const test = require("node:test");
const assert = require("node:assert/strict");
const {
  ROUTE_BIBLE_VERSION,
  applyUrlFormat,
  buildRouteBibleReference,
  buildRouteBibleUrl,
  ensureRouteBibleVersionList
} = require("../RouteBible.js");

test("Route Bible destination produces the expected URL", () => {
  const reference = buildRouteBibleReference("John", 3, 16, 16, 3);
  const url = buildRouteBibleUrl(reference);

  assert.equal(reference, "John 3:16");
  assert.equal(
    url,
    "https://route.bible/?q=John%203%3A16&utm_source=google_docs_linker&utm_medium=link"
  );
});

test("Route Bible destination is added to the supported versions list", () => {
  assert.deepEqual(
    ensureRouteBibleVersionList(["en_jw_nwt"]),
    ["en_jw_nwt", ROUTE_BIBLE_VERSION]
  );
});

test("Existing JW.org URL formatting remains unchanged", () => {
  const url = applyUrlFormat(
    "https://www.jw.org/finder?wtlocale=E&pub=nwt&bible=<<bookNum>><<chapterStart>><<verseStart>>-<<bookNum>><<chapterEnd>><<verseEnd>>",
    {
      bookNum: "43",
      chapterStart: "003",
      verseStart: "016",
      verseEnd: "016",
      chapterEnd: "003",
      bookNameAbbr1: "Joh",
      bookNameAbbr2: "John",
      bookNameFull: "John"
    }
  );

  assert.equal(
    url,
    "https://www.jw.org/finder?wtlocale=E&pub=nwt&bible=43003016-43003016"
  );
});
