import { NextResponse } from "next/server";

export const GET = () => {
  // Process static links from environment
  const staticLinks = process.env.STATIC_LINKS?.split(',').map(link => {
    const [type, url] = link.split(':');
    return { 
      label: type === 'fc' ? 'Farcaster' : 'GitHub', 
      action: "link" as const,
      target: url
    };
  }) || [];

  // Frame definition with combined buttons
  const frameResponse = {
    image: "https://placeholder.com/frame-image",
    buttons: [
      ...staticLinks.slice(0, 4) // Max 4 buttons supported by Farcaster
    ]
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
