import { findWikiPath } from "./pathFinder";

const startUrl = "https://en.wikipedia.org/wiki/Battle_of_Cr%C3%A9cy";
const endUrl = "https://en.wikipedia.org/wiki/Wehrmacht";

const testPathFinder = async (startUrl: string, endUrl: string) => {
  console.log("Searching for path...");

  const path = await findWikiPath(startUrl, endUrl);

  if (path) {
    console.log("Path found:");
    path.forEach((url, index) => console.log(`${index + 1}. ${url}`));
  } else {
    console.log("No path found.");
  }
};

testPathFinder(startUrl, endUrl);
