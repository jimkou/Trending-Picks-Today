# Trending Picks Today

A premium static site for showcasing trending products, built with pure HTML, CSS, and vanilla JavaScript. 

## Features

- ✅ Dynamic "Last Updated" date (en-GB locale format)
- ✅ Product images with lazy-loading
- ✅ JSON-based product data management
- ✅ Video modal support (9:16 aspect ratio for YouTube Shorts)
- ✅ Fully responsive design
- ✅ GitHub Pages compatible

## File Structure

```
.
├── index.html        # Main HTML file with embedded CSS
├── app.js           # Application logic
├── products.json    # Product data source
└── favicon.svg      # Site favicon
```

## Product Data Schema

Edit `products.json` to manage products. Each product has:

```json
{
  "id": "product-id",
  "name": "Product Name",
  "badge": "top-pick|best-value|budget",
  "rating": 4.5,
  "priceRange": "$$$$",
  "bestFor": "Description of who this is best for",
  "reason": "Why this product is trending",
  "amazonUrl": "https://amzn.to/...",
  "imageUrl": "https://...",  // Optional: product image URL
  "videoUrl": "https://www.youtube.com/watch?v=..."  // Optional: YouTube URL
}
```

### Using Product Images

**Important:** The current `products.json` uses placeholder images from `via.placeholder.com`. For production:

1. **Option 1: Use actual product images**
   - Upload images to your repository (e.g., in an `images/` folder)
   - Update `imageUrl` to point to your images: `"imageUrl": "images/roomba-j7.jpg"`

2. **Option 2: Use CDN-hosted images**
   - Host images on a reliable CDN (Cloudinary, Imgix, etc.)
   - Update `imageUrl` with CDN URLs

3. **Option 3: No images**
   - Set `imageUrl` to empty string: `"imageUrl": ""`
   - The site will gracefully handle missing images

### Adding Video Support

To add video support to a product:

1. Get a YouTube video URL (regular or Shorts format supported)
2. Add it to `videoUrl` in `products.json`
3. A "Watch" button will automatically appear
4. When clicked, opens a modal with the video in 9:16 aspect ratio

Supported formats:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`

## Development

To test locally:

```bash
# Start a local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

## Deployment

### Automatic GitHub Pages Deployment

The site automatically deploys to GitHub Pages via `.github/workflows/deploy-gh-pages.yml` on every push to the `main` branch.

**Live Site:** https://jimkou.github.io/Trending-Picks-Today/

### Initial Setup (One-Time Configuration)

To enable GitHub Pages for this repository:

1. Go to repository **Settings** > **Pages**
2. Under **Source**, select **GitHub Actions** from the dropdown
3. Save the settings

Once configured, the workflow will:
1. Trigger on every push to `main` branch (or manual workflow dispatch)
2. Build and upload site artifacts using official GitHub Actions
3. Deploy to GitHub Pages automatically
4. Provide deployment URL in the Actions logs

### Verifying Deployment

- Check deployment status: [Actions tab](https://github.com/jimkou/Trending-Picks-Today/actions)
- View the workflow run to see the deployed URL
- The site URL will be: `https://jimkou.github.io/Trending-Picks-Today/`

### Manual Deployment

You can manually trigger a deployment from the [Actions tab](https://github.com/jimkou/Trending-Picks-Today/actions) using the "Run workflow" button.

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features used
- CSS Grid and Flexbox
- Responsive design for mobile/tablet/desktop

## License

All rights reserved.
