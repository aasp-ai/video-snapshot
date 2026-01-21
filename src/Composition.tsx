import React, { useMemo } from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Img,
	Audio,
	staticFile,
    Easing,
    random
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Oswald'; // Tall, punchy font
import { loadFont as loadBody } from '@remotion/google-fonts/Montserrat'; // Clean geometric
import { 
    MoveRight, Zap, Target, Magnet, 
    X, Check, Fingerprint, Aperture 
} from 'lucide-react';

// --- ASSETS & CONFIG ---
const { fontFamily: titleFont } = loadFont();
const { fontFamily: bodyFont } = loadBody();

// Reliable High-Quality Cyberpunk/Chill Background
const BG_IMG = "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=1080&auto=format&fit=crop";

const THEME = {
    black: '#050505',
    offWhite: '#EAEAEA',
    accent: '#CCFF00', // Acid Green (Premium Tech feel)
    danger: '#FF2A2A', // Crimson
    glass: 'rgba(255, 255, 255, 0.05)',
};

// --- PRO COMPONENTS ---

// 1. Film Grain Overlay (Adds texture/cinema feel)
const FilmGrain = () => (
    <AbsoluteFill style={{ mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 99 }}>
         <div style={{
            width: '100%', height: '100%',
            filter: 'contrast(150%) brightness(100%)',
            opacity: 0.15,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
         }}/>
    </AbsoluteFill>
);

// 2. Cinematic Title with Masking
const ProTitle = ({ text1, text2, align = 'center', delay = 0, color = THEME.offWhite }: any) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Smooth reveal from bottom
    const progress = spring({ frame: frame - delay, fps, config: { damping: 15, mass: 0.8 } });
    const y = interpolate(progress, [0, 1], [110, 0]); // Moves up
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: align, gap: 0 }}>
            {/* Line 1 */}
            <div style={{ overflow: 'hidden', height: 130 }}>
                <h1 style={{
                    fontFamily: titleFont, fontSize: 120, color: color,
                    transform: `translateY(${y}%)`, lineHeight: 1, margin: 0,
                    textTransform: 'uppercase', letterSpacing: -2
                }}>
                    {text1}
                </h1>
            </div>
            {/* Line 2 */}
            {text2 && (
                <div style={{ overflow: 'hidden', height: 130 }}>
                    <h1 style={{
                        fontFamily: titleFont, fontSize: 120, color: 'transparent',
                        WebkitTextStroke: `2px ${color}`, // Outline style
                        transform: `translateY(${y}%)`, lineHeight: 1, margin: 0,
                        textTransform: 'uppercase', letterSpacing: -2,
                        opacity: 0.7
                    }}>
                        {text2}
                    </h1>
                </div>
            )}
        </div>
    );
};

// 3. Glitch Container
const RGBGlitch = ({ children, active }: any) => {
    const frame = useCurrentFrame();
    if (!active) return <>{children}</>;

    const offset = Math.sin(frame * 0.8) * 4;
    return (
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: -offset, color: 'red', mixBlendMode: 'screen', opacity: 0.7 }}>{children}</div>
            <div style={{ position: 'absolute', left: offset, color: 'blue', mixBlendMode: 'screen', opacity: 0.7 }}>{children}</div>
            <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
        </div>
    );
};

// --- SCENES ---

// 0:00 - 0:04 | Intro: High speed tunnel
const Scene1_Tunnel = () => {
    const frame = useCurrentFrame();
    
    // Grid movement
    const move = (frame * 50) % 200; 
    
    // Camera shake increasing
    const shake = interpolate(frame, [80, 120], [0, 10]);
    const x = (random(frame) - 0.5) * shake;
    const y = (random(frame + 1) - 0.5) * shake;

    return (
        <AbsoluteFill style={{ backgroundColor: THEME.black, overflow: 'hidden' }}>
            {/* Grid Floor */}
            <div style={{
                position: 'absolute', bottom: -200, left: -500, right: -500, height: 800,
                backgroundImage: `linear-gradient(${THEME.glass} 2px, transparent 2px), linear-gradient(90deg, ${THEME.glass} 2px, transparent 2px)`,
                backgroundSize: '100px 100px',
                transform: `perspective(500px) rotateX(60deg) translateY(${move}px)`
            }} />

            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', transform: `translate(${x}px, ${y}px)` }}>
                 <div style={{ position: 'relative' }}>
                     {frame < 60 ? (
                         <ProTitle text1="WHY WE" text2="CHASE?" />
                     ) : (
                         <ProTitle text1="IT RUNS" text2="AWAY" color={THEME.danger} delay={60} />
                     )}
                 </div>
                 
                 {/* Decorative Arrows */}
                 <div style={{ position: 'absolute', bottom: 300, display: 'flex', gap: 20, opacity: 0.5 }}>
                    <MoveRight color={THEME.offWhite} />
                    <MoveRight color={THEME.offWhite} />
                    <MoveRight color={THEME.offWhite} />
                 </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};

// 0:04 - 0:08 | Desperation: Glitch & Invert
const Scene2_Glitch = () => {
    const frame = useCurrentFrame();
    const active = frame > 20; // Glitch starts

    // Background flash
    const bg = active && frame % 4 < 2 ? THEME.offWhite : THEME.black;
    const textColor = active && frame % 4 < 2 ? THEME.black : THEME.offWhite;

    return (
        <AbsoluteFill style={{ backgroundColor: bg, justifyContent: 'center', alignItems: 'center' }}>
            <RGBGlitch active={active}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontFamily: titleFont, fontSize: 200, color: textColor, lineHeight: 0.8, letterSpacing: -10 }}>
                        DESPERATE
                    </h1>
                    <div style={{ height: 10, background: THEME.danger, width: '100%', marginTop: 20 }} />
                </div>
            </RGBGlitch>
            
            {active && (
                <div style={{ 
                    position: 'absolute', top: '20%', 
                    fontFamily: bodyFont, letterSpacing: 5, color: THEME.danger, fontWeight: 'bold' 
                }}>
                    SYSTEM ERROR // REVERSE
                </div>
            )}
        </AbsoluteFill>
    );
};

// 0:08 - 0:12 | Chill: Cinematic Parallax
const Scene3_Chill = () => {
    const frame = useCurrentFrame();
    
    // Slow Ken Burns Zoom
    const scale = interpolate(frame, [0, 120], [1.1, 1]);
    const y = interpolate(frame, [0, 120], [0, -50]);

    return (
        <AbsoluteFill style={{ backgroundColor: THEME.black }}>
            <Img 
                src={BG_IMG}
                style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transform: `scale(${scale}) translateY(${y}px)`,
                    opacity: 0.6
                }}
            />
            {/* Gradient Overlay for Text Readability */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #000 0%, transparent 80%)' }} />

            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ 
                    border: `2px solid ${THEME.accent}`, padding: '40px 60px', 
                    backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0,0,0,0.3)'
                }}>
                    <h1 style={{ fontFamily: titleFont, fontSize: 100, color: THEME.offWhite, margin: 0 }}>
                        STAY CHILL
                    </h1>
                </div>
                <h3 style={{ fontFamily: bodyFont, color: THEME.accent, marginTop: 30, letterSpacing: 4 }}>
                    AUTO-CORRECT MODE
                </h3>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};

// 0:12 - 0:16 | The Rule: Swiss Design/Minimal
const Scene4_Minimal = () => {
    const frame = useCurrentFrame();
    const rotate = interpolate(frame, [0, 120], [0, 90], { easing: Easing.bezier(0.25, 1, 0.5, 1) });

    return (
        <AbsoluteFill style={{ backgroundColor: THEME.offWhite, color: THEME.black, justifyContent: 'center', alignItems: 'center' }}>
            {/* Background Geometry */}
            <div style={{ position: 'absolute', opacity: 0.1, transform: `rotate(${rotate}deg)` }}>
                <Aperture size={800} strokeWidth={1} color={THEME.black} />
            </div>

            <div style={{ zIndex: 10 }}>
                <ProTitle text1="LIFE" text2="RULE #1" color={THEME.black} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, width: 400 }}>
                     <X size={50} color={THEME.danger} />
                     <h2 style={{ fontFamily: bodyFont, fontSize: 30, fontWeight: 900 }}>NO OVERTHINK</h2>
                </div>
            </div>
        </AbsoluteFill>
    );
};

// 0:16 - 0:22 | Magnet: Gold/Particles
const Scene5_Attract = () => {
    const frame = useCurrentFrame();
    
    // "Particles" moving towards center
    const particles = new Array(15).fill(0).map((_, i) => {
        const delay = i * 2;
        const radius = interpolate(frame - delay, [0, 60], [600, 100], { extrapolateRight: 'clamp' });
        const angle = (i / 15) * Math.PI * 2 + (frame * 0.02);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const opacity = interpolate(frame - delay, [0, 50, 60], [0, 1, 0]);
        
        return (
            <div key={i} style={{
                position: 'absolute', width: 10, height: 10, borderRadius: '50%',
                backgroundColor: THEME.accent, left: '50%', top: '50%',
                transform: `translate(${x}px, ${y}px)`, opacity
            }} />
        );
    });

    return (
        <AbsoluteFill style={{ backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' }}>
            {particles}
            
            <div style={{ 
                width: 200, height: 200, borderRadius: '50%', 
                border: `4px solid ${THEME.accent}`,
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                boxShadow: `0 0 50px ${THEME.accent}40`
            }}>
                <Magnet size={100} color={THEME.accent} />
            </div>
            
            <div style={{ position: 'absolute', bottom: 200 }}>
                 <ProTitle text1="IT COMES" text2="TO YOU" color={THEME.offWhite} align="center" delay={10} />
            </div>
        </AbsoluteFill>
    );
};

// --- MAIN COMPOSITION ---

export const MyVideo = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: THEME.black }}>
            <FilmGrain /> {/* Adds Global Texture */}
            
            {/* Audio: Ensure file is at public/audio/motivational.mp3 */}
            <Audio src={staticFile("audio/chill.mp3")} />
            
            <Sequence from={0} durationInFrames={120}>
                <Scene1_Tunnel />
            </Sequence>
            <Sequence from={120} durationInFrames={120}>
                <Scene2_Glitch />
            </Sequence>
            <Sequence from={240} durationInFrames={120}>
                <Scene3_Chill />
            </Sequence>
            <Sequence from={360} durationInFrames={120}>
                <Scene4_Minimal />
            </Sequence>
            <Sequence from={480} durationInFrames={180}>
                <Scene5_Attract />
            </Sequence>
        </AbsoluteFill>
    );
};