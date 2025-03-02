- [x] Task 1: Create Basic Frame API Endpoint ✅ 2025-03-02  
  File: `pages/api/frame.ts`  
  Action: Create file  
  Description: Initialize API route with hardcoded Frame response  
  Code:
  ```typescript
  export const GET = () => {
    return new Response(JSON.stringify({
      image: "https://placeholder.com/frame-image",
      buttons: [
        { label: "Btn1", action: "post" },
        { label: "Btn2", action: "post" },
        //... Add 4 buttons
      ]
    }), { headers: { 'Content-Type': 'application/json' } })
  }
  ```
  Verification: GET `/api/frame` returns 200 OK with 4 buttons

- [x] Task 2: Implement Static Links Configuration ✅ 2025-03-02  
  File: `pages/api/frame.ts`  
  Action: Modify GET handler  
  Description: Process STATIC_LINKS env variable  
  Code:
  ```typescript
  const staticLinks = process.env.STATIC_LINKS?.split(',').map(link => {
    const [type, url] = link.split(':')
    return { label: type === 'fc' ? 'Farcaster' : 'GitHub', action: 'link', target: url }
  }) || []
  ```
  UI Components: Static buttons in Frame  
  Verification: Buttons open configured URLs in new tab

- [x] Task 3: Create Farcaster Client ✅ 2025-03-02  
  File: `lib/farcasterClient.ts`  
  Action: Created file  
  Description: Fetch recent URLs from Farcaster API  
  Code:
  ```typescript
  // Implemented with mock data and URL extraction
  export const fetchRecentLinks = async (): Promise<string[]> => {
    // Returns mock URLs temporarily
    return extractUrlsFromCasts(MOCK_CASTS);
  }
  ```
  Verification: Returns mock URLs array for testing

- [x] Task 4: Add Dynamic Links Handling ✅ 2025-03-02  
  File: `pages/api/frame.ts`  
  Action: Modify GET handler  
  Code:
  ```typescript
  const dynamicLinks = await fetchRecentLinks()
  const buttons = [
    ...staticLinks,
    ...dynamicLinks.slice(0,1).map(url => ({
      label: "Dynamic Link",
      action: "link",
      target: url
    }))
  ]
  ```
  UI Components: First dynamic link button  
  Verification: Dynamic link appears in API response

- [ ] Task 5: Implement Pagination Parameters  
  File: `pages/api/frame.ts`  
  Action: Add query parsing  
  Code:
  ```typescript
  const page = Number(searchParams.get('page')) || 1
  const startIndex = (page - 1) * 3
  const visibleLinks = dynamicLinks.slice(startIndex, startIndex + 3)
  ```
  Verification: `?page=2` shows links 4-6

- [ ] Task 6: Create Navigation Buttons  
  File: `pages/api/frame.ts`  
  Action: Add conditional buttons  
  Code:
  ```typescript
  if (page > 1) buttons.push({ label: "Back", action: "post", target: `/api/frame?page=${page-1}` })
  if (dynamicLinks.length > startIndex + 3) buttons.push({ label: "More", action: "post", target: `/api/frame?page=${page+1}` })
  ```
  UI Components: Back/More buttons  
  Verification: Clicking updates page in Frame debugger

- [ ] Task 7: Create Image Generation Endpoint  
  File: `pages/api/image.tsx`  
  Action: Create file with OG generation  
  Code:
  ```tsx
  export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    return new ImageResponse(
      <div style={{ fontSize: 48 }}>
        {searchParams.has('error') ? 'Error Header' : 'My Links'}
      </div>
    )
  }
  ```
  UI Components: Dynamic image headers  
  Verification: Visually confirm different headers

- [ ] Task 8: Add Caching Layer  
  File: `lib/farcasterClient.ts`  
  Action: Add caching logic  
  Code:
  ```typescript
  let cachedLinks: { timestamp: number, data: string[] } | null = null
  
  export const fetchRecentLinks = async () => {
    if (cachedLinks?.timestamp > Date.now() - 3600_000) {
      return cachedLinks.data
    }
    // ... existing fetch logic
    cachedLinks = { timestamp: Date.now(), data: links }
  }
  ```
  Verification: Repeated calls return cached data within 1 hour

Each task builds on previous steps with explicit file modifications and verifiable outcomes through API inspection and UI observation.
