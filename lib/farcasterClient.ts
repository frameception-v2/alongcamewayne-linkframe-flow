
// Temporary mock data until real API integration
const MOCK_CASTS = [
  { text: "Check out https://example.com and http://test.org" },
  { text: "Visit https://awesome-project.dev for details" }
];

export const fetchRecentLinks = async (): Promise<string[]> => {
  try {
    // TODO: Replace with real API call
    // const res = await axios.get('https://api.farcaster.example/casts');
    // return extractUrlsFromCasts(res.data.casts);
    
    // Using mock data temporarily
    return extractUrlsFromCasts(MOCK_CASTS);
  } catch (error) {
    console.error("Error fetching Farcaster links:", error);
    return [];
  }
};

// Extract unique URLs from cast texts
function extractUrlsFromCasts(casts: Array<{ text: string }>): string[] {
  const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/gi;
  const urls = casts.flatMap(cast => 
    cast.text.match(urlRegex) || []
  );
  return [...new Set(urls)]; // Return unique URLs
}
