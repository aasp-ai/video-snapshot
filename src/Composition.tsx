import { useEffect, useRef, useState } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Application, Graphics, Text } from 'pixi.js';
import gsap from 'gsap';

/**
 * AI_ENGINEER_NOTE: 
 * This is the main video canvas. 
 * You can use PixiJS (appRef), Three.js (React Three Fiber), or GSAP for animations.
 * Always ensure cleanup in the useEffect return statement to prevent memory leaks during HMR.
 */

export const MyComposition = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<Application | null>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const [isReady, setIsReady] = useState(false);

    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    useEffect(() => {
        if (!containerRef.current) return;
        
        const app = new Application();
        
        const setup = async () => {
            // PixiJS v8 Initialization
            await app.init({
                width, 
                height, 
                backgroundColor: 0x000000, 
                backgroundAlpha: 0, // Transparent background for layering
                antialias: true,
                resolution: window.devicePixelRatio || 1,
            });

            if (!containerRef.current) {
                app.destroy(true, { children: true });
                return;
            }

            containerRef.current.appendChild(app.canvas);
            appRef.current = app;

            // --- AI_START: GRAPHICS_LOGIC ---
            
            // Example: Pulsing Circle
            const circle = new Graphics().circle(0, 0, 150).fill(0x0070f3);
            circle.x = width / 2;
            circle.y = height / 2;
            circle.scale.set(0);
            app.stage.addChild(circle);

            const text = new Text({ 
                text: "GENERATING...", 
                style: { fill: 'white', fontSize: 80, fontWeight: 'bold', fontFamily: 'Arial' }
            });
            text.anchor.set(0.5);
            text.x = width / 2;
            text.y = height / 2 + 250;
            text.alpha = 0;
            app.stage.addChild(text);

            // GSAP Timeline bound to Remotion frame
            const tl = gsap.timeline({ paused: true });
            tl.to(circle.scale, { x: 1.2, y: 1.2, duration: 1, ease: "power2.out" })
              .to(text, { alpha: 1, y: "-=20", duration: 0.5 }, "-=0.3");
            
            tlRef.current = tl;

            // --- AI_END: GRAPHICS_LOGIC ---

            setIsReady(true);
        };

        setup();

        return () => {
            // Robust cleanup for HMR & Strict Mode
            if (appRef.current) {
                appRef.current.destroy(true, { children: true });
                appRef.current = null;
            }
            if (tlRef.current) {
                tlRef.current.kill();
                tlRef.current = null;
            }
            setIsReady(false);
        };
    }, [width, height]);

    // Sync GSAP with Remotion Frame
    useEffect(() => {
        if (isReady && tlRef.current) {
            tlRef.current.seek(frame / fps);
            // Pixi app renders automatically if ticker is active, 
            // but manual render is safer for frame-perfect sync
            appRef.current?.render();
        }
    }, [frame, fps, isReady]);

    return (
        <div 
            ref={containerRef} 
            style={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: '#000' 
            }} 
        />
    );
};
