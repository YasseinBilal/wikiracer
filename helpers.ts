import { load } from "cheerio";

// Helper function to convert a Wikipedia title to a URL
export const titleToUrl = (title: string): string =>
  `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;

// Helper function to extract Wikipedia title from a full URL
export const extractWikiTitle = (url: string): string => {
  const match = url.match(/\/wiki\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : "";
};

// Function to get all internal Wikipedia links from a given Wikipedia page title
export const getInternalLinks = async (
  pageTitle: string
): Promise<string[]> => {
  const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(pageTitle)}`;
  const response = await fetch(url);
  const html = await response.text();
  const $ = load(html);

  // Using Set to eliminate links duplications
  const internalLinks = new Set<string>();

  $('a[href^="/wiki/"]').each((_, element) => {
    const link = $(element).attr("href") as string;
    if (!link.includes(":")) {
      const title = link.replace("/wiki/", "");
      internalLinks.add(title);
    }
  });

  return Array.from(internalLinks);
};
