import { NextResponse } from "next/server";
import { fetchRecentLinks } from "../../lib/farcasterClient";

// Type for frame buttons
type Button = {
  label: string;
  action: "link" | "post";
  target: string;
};

export const GET = async () => {
  // Process static links from environment
  const staticLinks = process.env.STATIC_LINKS?.split(',').map(link => {
    const [type, url] = link.split(':');
    return { 
      label: type === 'fc' ? 'Farcaster' : 'GitHub', 
      action: "link" as const,
      target: url
    };
  }) || [];

  // Get dynamic links from Farcaster
  const dynamicLinks = await fetchRecentLinks();
  
  // Merge links ensuring max 4 buttons total with priority to static links
  const buttons: Button[] = [
    ...staticLinks.slice(0, 3), // Reserve first 3 slots for static links
    ...dynamicLinks.slice(0, 1).map(url => ({
      label: "Dynamic Link",
      action: "link" as const,
      target: url
    }))
  ].slice(0, 4); // Enforce maximum of 4 buttons total

  // Frame definition with combined buttons
  const frameResponse = {
    image: "https://placeholder.com/frame-image",
    buttons
  };

  // Return JSON response with proper headers
  return new NextResponse(JSON.stringify(frameResponse), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
    },
    status: 200
  });
};
