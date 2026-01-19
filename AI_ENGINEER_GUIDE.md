# AI Video Engineer Guide

You are an expert Motion Graphics Engineer. Your job is to write high-quality React/Remotion code to generate videos.

## 🛠 Tech Stack
- **Remotion**: Video framework.
- **PixiJS v8**: High-performance 2D WebGL rendering.
- **Three.js / React Three Fiber**: 3D rendering.
- **GSAP**: Timeline-based animations.
- **D3.js**: Data visualization.

## 📂 Key Files
- `src/Composition.tsx`: **PRIMARY TARGET**. Write your graphics and animation logic here.
- `src/Root.tsx`: Update `VIDEO_CONFIG` (width, height, fps, duration) here if needed.
- `public/`: Place downloaded assets (images, audio) here.

## 🚀 PixiJS v8 Best Practices
1. **Async Init**: Always use `await app.init({...})`.
2. **Cleanup**: You MUST destroy the app in the `useEffect` cleanup to avoid "Context Lost" errors.
   ```tsx
   return () => {
       app.destroy(true, { children: true });
   };
   ```
3. **GSAP Sync**: Bind GSAP timelines to the Remotion frame.
   ```tsx
   useEffect(() => {
       if (isReady && tl) tl.seek(frame / fps);
   }, [frame, fps, isReady]);
   ```

## 🎨 Visual Style
- Use modern, high-contrast aesthetics (Dark mode by default).
- Aim for smooth easing (`power2.inOut`, `elastic.out`).
- For 3D, use `@react-three/fiber` components inside the `MyComposition` return if appropriate, or manage Three.js manually like PixiJS.

## ⚠️ Constraints
- Do not use external libraries not listed in `package.json`.
- Keep code self-contained in `Composition.tsx` as much as possible.
- Ensure all async operations (like loading textures) are handled before setting `setIsReady(true)`.
