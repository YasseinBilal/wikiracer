// Helper function to convert a Wikipedia title to a URL
export const titleToUrl = (title: string): string =>
  `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;

// Helper function to extract Wikipedia title from a full URL
export const extractWikiTitle = (url: string): string => {
  const match = url.match(/\/wiki\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : "";
};
