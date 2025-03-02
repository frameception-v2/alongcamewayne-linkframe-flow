import { NextResponse } from "next/server";

export const GET = () => {
  // Basic frame definition with 4 buttons
  const frameResponse = {
    image: "https://placeholder.com/frame-image", // Default image URL
    buttons: [
      { label: "Button 1", action: "post" },
      { label: "Button 2", action: "post" },
      { label: "Button 3", action: "post" },
      { label: "Button 4", action: "post" }
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
