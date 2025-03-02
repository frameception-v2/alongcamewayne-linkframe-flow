### 1. Core Functionality
**Main User Flow**  
1. User opens Frame → displays static header image + 3-4 buttons (Farcaster, GitHub, dynamic recent links)  
2. Clicking any button opens target URL in new tab  
3. "More" button cycles paginated recent links (if >3 entries)  

**Required API Endpoints**  
- `POST /api/frame`:  
  - Generates Frame UI with buttons  
  - Accepts page number parameter for pagination  
  - Returns Frame metadata (buttons, images)  

**Key Data Structures**  
```typescript
type Link = {
  title: string;  // "GitHub Profile"
  url: string;    // "https://github.com/username"
  type: "static" | "dynamic"; // Static = permanent links
};

type FrameState = {
  page: number;   // Current pagination index
};
```

### 2. Implementation Approach
**Frame Structure**  
![Frame Layout](https://i.imgur.com/XYZ1234.png)  
- **Screen 1 (Default):**  
  - Image: User's avatar + "My Links" header  
  - Buttons: Farcaster, GitHub, 1st dynamic link, "More →"  

- **Screen 2+ (Pagination):**  
  - Image: "Recent Shared Links" header  
  - Buttons: Up to 4 dynamic links + "← Back"  

**API Integrations**  
- Farcaster Hub (Recent Links):  
  ```typescript
  // Fetch last 10 casts with URLs
  const recentLinks = await farcasterClient.getCasts(userFid)
    .filter(cast => cast.urls)
    .slice(0, 10);
  ```

**State Management**  
- Encode state in URL query params:  
  ```
  /api/frame?page=2
  ```  
- Max 4 buttons per screen → paginate dynamic links in groups of 3

### 3. Technical Considerations
**Authentication**  
- Farcaster API: Requires `userFid` (user's Farcaster ID) from Frame context  
- GitHub: No auth needed for public profile links  

**Critical Error Scenarios**  
1. **Farcaster API Unavailable:**  
   - Fallback to cached recent links or hide dynamic section  
   - Show error state in image: "Links temporarily unavailable"  

2. **Invalid URL Format:**  
   - Sanitize user-shared links with regex filter:  
   ```typescript
   const isValid = url.match(/^https?:\/\/(.+)/);
   ```

3. **Button Overflow:**  
   - Hard cap of 4 buttons → prioritize most recent links  
   - Always keep navigation buttons ("Back"/"More") visible

---

**Example Configuration**  
`.env.local`  
```bash
# Required for Farcaster data
NEXT_PUBLIC_FARCASTER_HUB_URL=https://hub.farcaster.xyz
USER_FID=12345  # User's Farcaster ID
STATIC_LINKS=fc:https://warpcast.com/me,gh:https://github.com/me
```