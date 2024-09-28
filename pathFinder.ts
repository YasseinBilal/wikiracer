import { extractWikiTitle, titleToUrl } from "./helpers";
import { getInternalLinks } from "./crawler";

// BFS algorithm to find a path between two Wikipedia pages
export async function findWikiPath(
  startUrl: string,
  endUrl: string
): Promise<string[] | null> {
  const start = extractWikiTitle(startUrl);
  const end = extractWikiTitle(endUrl);
  const visited = new Set<string>();
  const queue = [{ title: start, path: [titleToUrl(start)] }];

  visited.add(start);

  while (queue.length > 0) {
    const currentTitles = queue.map((item) => item.title);
    const currentPaths = queue.map((item) => item.path);
    queue.length = 0; // Clear queue for next iteration

    for await (const currentTitlesInternalLinks of getTitlesInternalLinks(
      currentTitles
    )) {
      for (const currentTitle of Object.keys(currentTitlesInternalLinks)) {
        const currentTitlePath =
          currentPaths[currentTitles.indexOf(currentTitle)];
        const currentTitleInternalLinks =
          currentTitlesInternalLinks[currentTitle];

        for (const currentTitleInternalLink of currentTitleInternalLinks) {
          if (currentTitleInternalLink === end) {
            return [...currentTitlePath, titleToUrl(end)];
          }

          if (!visited.has(currentTitleInternalLink)) {
            visited.add(currentTitleInternalLink);
            queue.push({
              title: currentTitleInternalLink,
              path: [...currentTitlePath, titleToUrl(currentTitleInternalLink)],
            });
          }
        }
      }
    }
  }

  return null;
}

// Generator function to process titles in chunks and fetch their internal links
async function* getTitlesInternalLinks(
  titles: string[]
): AsyncGenerator<{ [key: string]: string[] }> {
  const chunkSize = 300;

  for (let i = 0; i < titles.length; i += chunkSize) {
    const chunk = titles.slice(i, i + chunkSize);

    const chunkResults = await Promise.all(
      chunk.map(async (title) => ({
        [title]: await getInternalLinks(title),
      }))
    );

    yield chunkResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  }
}
