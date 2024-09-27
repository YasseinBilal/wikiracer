// Fetch the links from the Wikipedia API for a given page title
async function fetchWikiLinks(pageTitle: string): Promise<string[]> {
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles=${pageTitle}&pllimit=max&origin=*`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch links for ${pageTitle}: ${response.statusText}`
    );
  }

  const data = await response.json();
  const pages = data.query.pages;

  const links: string[] = [];

  // Extract links from the API response
  for (const pageId in pages) {
    const page = pages[pageId];
    if (page.links) {
      for (const link of page.links) {
        links.push(link.title);
      }
    }
  }

  return links;
}

// Convert Wikipedia page title to URL
function titleToUrl(title: string): string {
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
}

// BFS algorithm to find the shortest path between two Wikipedia pages using the Wikipedia API
async function findWikiPath(
  startTitle: string,
  endTitle: string
): Promise<string[] | null> {
  const visited = new Set<string>();
  const queue: Array<{ title: string; path: string[] }> = [
    { title: startTitle, path: [titleToUrl(startTitle)] },
  ];

  visited.add(startTitle);

  while (queue.length > 0) {
    const { title, path } = queue.shift()!;

    // If we reach the target page, return the path
    if (title === endTitle) {
      return path;
    }

    // Fetch the links from the current Wikipedia page
    try {
      const links = await fetchWikiLinks(title);

      console.log("links", links);

      // Add valid unvisited links to the queue
      for (const link of links) {
        if (!visited.has(link)) {
          visited.add(link);
          queue.push({ title: link, path: [...path, titleToUrl(link)] });
        }
      }
    } catch (error) {
      console.error(`Error fetching links for ${title}: ${error}`);
    }
  }

  // If no path is found, return null
  return null;
}

// Example usage:
(async () => {
  const startTitle = "Battle_of_Crécy";
  const endTitle = "Wehrmacht";

  console.log("Searching for path...");
  const path = await findWikiPath(startTitle, endTitle);

  if (path) {
    console.log("Path found:");
    path.forEach((url, index) => console.log(`${index + 1}. ${url}`));
  } else {
    console.log("No path found.");
  }
})();
