# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Rendering Videos

This sandbox includes a backend API that uses Remotion CLI to render videos server-side with real-time progress updates via Server-Sent Events (SSE) and **social media presets**.

### Running the Application

To run both frontend and backend servers simultaneously:

```bash
npm run dev:all
```

Or run them separately:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server
```

**Important:** The backend server runs on port 3001 and must be started for the render button to work.

### Using the Render Button

1. Make sure both the frontend (Vite dev server) and backend (Express server) are running
2. Select a social media preset from the dropdown menu:
   - 🎵 **TikTok Reels** - Optimized for vertical videos
   - 📸 **Instagram Reels** - High quality for feed
   - ▶️ **YouTube** - Maximum quality for streaming
   - 🐦 **Twitter/X** - Fast upload, good quality
   - 📘 **Facebook** - Balanced for social media
   - 💼 **LinkedIn** - Professional quality
   - ⚙️ **Custom** - Custom settings
3. Click the "Render & Save Video" button
4. A real-time progress panel will appear showing:
   - Current render status (initializing, bundling, rendering, etc.)
   - Progress percentage with visual progress bar
   - Number of rendered and encoded frames
   - Current rendering stage
5. The video will be automatically downloaded as MP4 when complete

### Social Media Presets

Each preset is optimized for its target platform:

| Platform | CRF | Video Bitrate | Audio Bitrate | Preset | Max Duration |
|----------|------|----------------|-----------------|---------|---------------|
| TikTok | 20 | 8 Mbps | 128k | Medium | 60 sec |
| Instagram | 20 | 10 Mbps | 192k | Medium | 90 sec (Reels) |
| YouTube | 18 | 20 Mbps | 320k | Slow | 12 hours |
| Twitter | 22 | 6 Mbps | 128k | Fast | 2:20 min |
| Facebook | 20 | 8 Mbps | 192k | Medium | 240 min |
| LinkedIn | 20 | 10 Mbps | 192k | Medium | 10 min |

**CRF (Constant Rate Factor)**:
- Lower = Better quality, larger files (18 is high quality)
- Higher = Smaller files, lower quality (23 is default)
- Range: 0-51 (typical: 18-28)

### Real-Time Progress Features

The render API uses Server-Sent Events (SSE) to provide real-time updates:

- **Status Events**: Current stage of the rendering process
  - `initializing` - Starting to render
  - `bundling` - Bundling the Remotion project
  - `selecting` - Selecting the composition
  - `rendering` - Rendering video frames
- **Progress Events**: Detailed progress information
  - Progress percentage (0-100%)
  - Rendered frame count
  - Encoded frame count
  - Current stage (encoding, muxing, etc.)
- **Complete Event**: Video finished and ready for download
- **Error Event**: Render failed with error details

### API Endpoints

- `POST /api/render` - Start rendering a video (returns SSE stream)
  - Body: `{ "compositionId": "AI-Video-Composition", "preset": "tiktok" }`
  - Available presets: `tiktok`, `instagram`, `youtube`, `twitter`, `facebook`, `linkedin`, `custom`
- `GET /api/download/:filename` - Download a rendered video
- `GET /api/status` - Check if the render API is ready

### Manual CLI Rendering

You can also use the CLI directly:

```bash
# Render as MP4
npm run render

# Render as ProRes
npm run render:prores
```

### File Structure

- `src/index.tsx` - Remotion root entry point (must include `registerRoot()`)
- `server.ts` - Express API server with SSE support for rendering
- `output/` - Directory where rendered videos are saved

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
