### Step 1: Create Basic Frame API Endpoint
```text
- Build: Initialize Next.js API route at `/api/frame` with hardcoded response 
- Outcome: Verify endpoint returns valid Frame metadata with:
  - Placeholder image URL 
  - 4 dummy buttons (e.g. "Btn1", "Btn2")
  - Test via HTTP client or browser
```

### Step 2: Integrate Static Links Configuration  
```text
- Build: Parse `STATIC_LINKS` env variable into Link array
- Outcome: Frame shows functional Farcaster/GitHub buttons:
  - Clicking opens correct URLs in new tab
  - Test with example `fc:...,gh:...` config
```

### Step 3: Fetch Dynamic Links from Farcaster API
```text
- Build: Add Farcaster client integration to get recent URLs from casts
- Outcome: Dynamic links appear in API response:
  - First dynamic link shows on default page
  - "More" button appears when >1 dynamic link exists
  - Test with mock casts containing URLs
```

### Step 4: Implement Pagination Logic
```text
- Build: Handle `page` query param to slice dynamic links
- Outcome: 
  - `/api/frame?page=1` shows first dynamic link
  - `/api/frame?page=2` shows links 2-4
  - Manual param changes display correct link batches
```

### Step 5: Add Navigation Buttons (Back/More)
```text
- Build: Generate navigation buttons with encoded page state
- Outcome:
  - "More" on page 1 → page=2
  - "Back" on page 2 → page=1
  - Verify button clicks update page number in Frame debugger
```

### Step 6: Generate Dynamic Images for Each Page
```text
- Build: Create image endpoint with `@vercel/og` for:
  - Default page: "My Links" header + avatar
  - Paginated pages: "Recent Shared Links" header
- Outcome: Visual confirmation of correct header per page state
```

### Step 7: Handle Farcaster API Errors and URL Validation
```text
- Build: Add error boundaries and URL regex validation
- Outcome:
  - Invalid URLs filtered from response
  - API failures show error image
  - Test by disabling network requests
```

### Step 8: Finalize Error States and Caching
```text
- Build: Implement 1-hour cache for Farcaster data
- Outcome:
  - Cached links persist during API outages
  - Error images display "Links temporarily unavailable"
  - Verify via forced API errors
```