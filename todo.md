- [ ] Task 1: Create Basic Frame API Endpoint  
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

- [ ] Task 2: Implement Static Links Configuration  
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

- [ ] Task 3: Create Farcaster Client  
  File: `lib/farcasterClient.ts`  
  Action: Create file  
  Description: Fetch recent URLs from Farcaster API  
  Code:
  ```typescript
  export const fetchRecentLinks = async (): Promise<string[]> => {
    const res = await axios.get('https://api.farcaster.example/casts')
    return res.data.casts.flatMap(extractUrls) // Implement URL extraction
  }
  ```
  Verification: Returns array of URLs from mock casts

- [ ] Task 4: Add Dynamic Links Handling  
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