import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
	random,
	Audio,
    Html5Audio,
	staticFile,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Hind';
import {
	Laptop,
	Coffee,
	Clock,
	Smartphone,
	Sun,
	MousePointer2,
} from 'lucide-react';
import React from 'react';

// --- CONFIGURATION ---
const WIDTH = 1080;
const HEIGHT = 1920;
const FPS = 30;

// Syncing to your 45-second audio transcript
// S1: 0-4s (4s) "Baithte ho..."
// S2: 4-8s (4s) "Par ye kaam..."
// S3: 8-12s (4s) "Phone buzz..."
// S4: 12-16s (4s) "Bus ek baar..."
// S5: 16-20s (4s) "Sochte ho break..."
// S6: 20-24s (4s) "Time gaya..."
// S7: 24-30s (6s) "Tum busy the... output zero"
// S8: 30-35s (5s) "Sapne toot-te nahi... pighal jate"
// S9: 35-37s (2s) "Ab decide karo"
// S10: 37-45s (8s) "Screen ya life"
const SCENE_SECONDS = [4, 4, 4, 4, 4, 4, 6, 5, 2, 8];

// Calculate frames
const SCENE_FRAMES = SCENE_SECONDS.map(s => Math.round(s * FPS));
const TOTAL_FRAMES = SCENE_FRAMES.reduce((a, b) => a + b, 0);

// Generate start points
const SCENE_STARTS = SCENE_FRAMES.reduce((acc, curr, i) => {
    if (i === 0) return [0];
    const prevStart = acc[i - 1];
    const prevDur = SCENE_FRAMES[i - 1];
    return [...acc, prevStart + prevDur];
}, [] as number[]);

export const VIDEO_CONFIG = {
    width: WIDTH,
    height: HEIGHT,
    fps: FPS,
    durationInFrames: TOTAL_FRAMES,
    id: "MotivationReel"
};

// --- STYLES & ASSETS ---
const { fontFamily } = loadFont(); 

const BG_COLOR = '#111111';
const TEXT_COLOR = '#ffffff';
const ACCENT_COLOR = '#facc15'; // Yellow
const DANGER_COLOR = '#f87171'; // Red

// --- HELPER COMPONENTS ---

const FadeInText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
	const frame = useCurrentFrame();
	const words = text.split(' ');

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', padding: '0 40px' }}>
			{words.map((w, i) => {
				const opacity = interpolate(frame - delay, [i * 5, i * 5 + 15], [0, 1], {
					extrapolateRight: 'clamp',
					extrapolateLeft: 'clamp',
				});
				return (
					<span key={i} style={{ fontFamily, fontSize: 60, fontWeight: 'bold', color: TEXT_COLOR, opacity }}>
						{w}
					</span>
				);
			})}
		</div>
	);
};

// --- SCENES ---

const Scene1 = () => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 30], [0, 1]); // Slower fade in
	
	return (
		<AbsoluteFill style={{ backgroundColor: BG_COLOR, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
			<div style={{ opacity, marginBottom: 50, display: 'flex', gap: 40 }}>
				<Laptop size={80} color={TEXT_COLOR} strokeWidth={1} />
				<Coffee size={80} color={TEXT_COLOR} strokeWidth={1} />
			</div>
			<FadeInText text="बैठते हो काम के लिए…" />
            {/* Particles */}
			{new Array(8).fill(0).map((_, i) => (
				<div key={i} style={{
						position: 'absolute', width: 4, height: 4, borderRadius: '50%', backgroundColor: 'white', opacity: 0.3,
						left: `${random(i) * 100}%`, top: `${random(i + 10) * 100}%`,
						transform: `translateY(${-frame * 1.5}px)`,
					}}
				/>
			))}
		</AbsoluteFill>
	);
};

const Scene2 = () => {
	const frame = useCurrentFrame();
    // Slower wobble
	const wobble = Math.sin(frame / 10) * 3; 
	const pulse = 1 + Math.sin(frame / 5) * 0.05;

	return (
		<AbsoluteFill style={{ backgroundColor: BG_COLOR, justifyContent: 'center', alignItems: 'center' }}>
			<div style={{ position: 'absolute', opacity: 0.2, transform: `scale(${pulse})` }}>
				<Clock size={400} color={DANGER_COLOR} />
			</div>
			<div style={{ transform: `rotate(${wobble}deg)` }}>
				<h1 style={{ fontFamily, fontSize: 55, color: TEXT_COLOR, textAlign: 'center', padding: 20 }}>
					पर ये काम time पे<br />खतम क्यों नहीं होता…
				</h1>
			</div>
		</AbsoluteFill>
	);
};

const Scene3 = () => {
	const frame = useCurrentFrame();
    // Shake mostly at the start
    const shakeIntensity = interpolate(frame, [0, 20, 60], [20, 5, 0], { extrapolateRight: 'clamp' });
	const shakeX = random(frame) * shakeIntensity - (shakeIntensity/2);
	const shakeY = random(frame + 1) * shakeIntensity - (shakeIntensity/2);
	
	const isFlash = frame % 15 < 5; 

	return (
		<AbsoluteFill style={{ backgroundColor: isFlash ? '#222' : BG_COLOR, justifyContent: 'center', alignItems: 'center' }}>
			<Smartphone size={100} color={ACCENT_COLOR} style={{ marginBottom: 20, transform: `translate(${shakeX}px, ${shakeY}px)` }} />
			<h1 style={{ fontFamily, fontSize: 120, color: TEXT_COLOR, fontWeight: 900, transform: `translate(${shakeX * 1.5}px, ${shakeY * 1.5}px)` }}>
				BUZZ
			</h1>
			<p style={{ fontFamily, fontSize: 40, color: '#888' }}>important नहीं…</p>
		</AbsoluteFill>
	);
};

const Scene4 = () => {
	const frame = useCurrentFrame();
	const { width } = useVideoConfig();
	
	const slide1 = interpolate(frame, [0, 30], [width, 0], { extrapolateRight: 'clamp' });
	const slide2 = interpolate(frame, [30, 60], [width, 0], { extrapolateRight: 'clamp' });

	return (
		<AbsoluteFill style={{ backgroundColor: BG_COLOR, justifyContent: 'center', alignItems: 'center' }}>
			<div style={{ transform: `translateX(${slide1}px)`, position: 'absolute', top: '30%' }}>
				<h1 style={{ fontFamily, fontSize: 80, color: TEXT_COLOR }}>बस एक बार...</h1>
			</div>
			
			<div style={{ transform: `translateX(${-slide2}px)`, position: 'absolute', top: '50%', display: 'flex', alignItems: 'center', gap: 20 }}>
				<MousePointer2 size={60} color={ACCENT_COLOR} />
				<h1 style={{ fontFamily, fontSize: 100, color: ACCENT_COLOR, fontStyle: 'italic' }}>SCROLL</h1>
			</div>
		</AbsoluteFill>
	);
};

const Scene5 = () => {
	const frame = useCurrentFrame();
    // Slower drift since scene is longer
	const drift = interpolate(frame, [0, 90], [0, -100]);
	const opacity = interpolate(frame, [0, 60], [1, 0.4]);
	const blur = interpolate(frame, [0, 60], [0, 8]);

	return (
		<AbsoluteFill style={{ backgroundColor: BG_COLOR, justifyContent: 'center', alignItems: 'center' }}>
			<div style={{ transform: `translateY(${drift}px)`, opacity, filter: `blur(${blur}px)` }}>
				<h1 style={{ fontFamily, fontSize: 60, color: TEXT_COLOR }}>सोचते हो ‘break ही तो है…’</h1>
			</div>
		</AbsoluteFill>
	);
};

const Scene6 = () => {
	const frame = useCurrentFrame();
	const rotate = interpolate(frame, [0, 90], [0, -360]);
	
	const glitchX = random(frame) > 0.8 ? (random(frame+1) * 20 - 10) : 0;

	return (
		<AbsoluteFill style={{ backgroundColor: BG_COLOR, justifyContent: 'center', alignItems: 'center' }}>
			<div style={{ transform: `rotate(${rotate}deg)`, marginBottom: 50 }}>
				<Clock size={150} color={TEXT_COLOR} />
			</div>
			<div style={{ transform: `translateX(${glitchX}px)` }}>
				<h1 style={{ fontFamily, fontSize: 60, color: TEXT_COLOR, textAlign: 'center' }}>
					and time गया,<br />काम वही का वही…
				</h1>
			</div>
		</AbsoluteFill>
	);
};

const Scene7 = () => {
	const frame = useCurrentFrame();
    
    // Scene is 6 seconds (180 frames)
    // Fill bar for 3 seconds, then drop
	const progress = interpolate(frame, [0, 60, 90, 100], [0, 100, 100, 0], { extrapolateRight: 'clamp' });
	
	const textToShow = frame > 90 ? "output zero hai..." : "tum busy थे पूरा time…";
	const barColor = frame > 90 ? DANGER_COLOR : ACCENT_COLOR;

	return (
		<AbsoluteFill style={{ backgroundColor: BG_COLOR, justifyContent: 'center', alignItems: 'center' }}>
			<h1 style={{ fontFamily, fontSize: 50, color: TEXT_COLOR, marginBottom: 40 }}>
				{textToShow}
			</h1>
			
			<div style={{ width: '80%', height: 40, border: '2px solid #555', borderRadius: 20, padding: 5 }}>
				<div style={{ 
					width: `${progress}%`, 
					height: '100%', 
					backgroundColor: barColor, 
					borderRadius: 15,
					transition: 'background-color 0.2s'
				}} />
			</div>
			<h2 style={{ fontFamily, fontSize: 40, color: barColor, marginTop: 20 }}>
				{Math.round(progress)}%
			</h2>
		</AbsoluteFill>
	);
};

const Scene8 = () => {
    const frame = useCurrentFrame();
    // Scene is 5s (150 frames)
    
    const crackGap = interpolate(frame, [0, 60], [0, 20], { extrapolateRight: 'clamp' });
    
    // Start melting in second half
    const meltY = interpolate(frame, [70, 120], [0, 60], { extrapolateRight: 'clamp' });
    const blur = interpolate(frame, [70, 120], [0, 8]);

    return (
        <AbsoluteFill style={{ backgroundColor: BG_COLOR, justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative', marginBottom: 50 }}>
                <div style={{ 
                    fontFamily, fontSize: 70, fontWeight: 'bold', color: TEXT_COLOR,
                    clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 55%)',
                    transform: `translate(-${crackGap}px, -${crackGap}px) rotate(-${crackGap/2}deg)`
                }}>
                    सपने टूटते नहीं…
                </div>
                <div style={{ 
                    fontFamily, fontSize: 70, fontWeight: 'bold', color: TEXT_COLOR,
                    position: 'absolute', top: 0, left: 0,
                    clipPath: 'polygon(0 55%, 100% 45%, 100% 100%, 0 100%)',
                    transform: `translate(${crackGap}px, ${crackGap}px) rotate(${crackGap/2}deg)`
                }}>
                    सपने टूटते नहीं…
                </div>
            </div>

            <div style={{ filter: `blur(${blur}px)` }}>
                <h1 style={{ 
                    fontFamily, 
                    fontSize: 70, 
                    fontWeight: 'bold', 
                    color: ACCENT_COLOR,
                    textAlign: 'center',
                    transform: `scaleY(${1 + meltY/20}) translateY(${meltY}px)`
                }}>
                    बस swipe करते करते<br/>पिघल जाते हैं
                </h1>
            </div>
        </AbsoluteFill>
    );
};

const Scene9 = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    // Fast impact scene (2s)
    const scale = spring({ frame, fps, config: { damping: 10, stiffness: 100 } });

    return (
        <AbsoluteFill style={{ backgroundColor: BG_COLOR, justifyContent: 'center', alignItems: 'center' }}>
            <h2 style={{ fontFamily, fontSize: 40, color: '#888', marginBottom: 20 }}>अब</h2>
            <h1 style={{ 
                fontFamily, 
                fontSize: 150, 
                fontWeight: 900, 
                color: TEXT_COLOR,
                transform: `scale(${scale})`,
                textShadow: `0 0 20px ${ACCENT_COLOR}`
            }}>
                DECIDE
            </h1>
            <h2 style={{ fontFamily, fontSize: 40, color: '#888', marginTop: 20 }}>करो</h2>
        </AbsoluteFill>
    );
};

const Scene10 = () => {
    const frame = useCurrentFrame();
    // Long Outro (8s)
    const leftX = interpolate(frame, [0, 40], [-100, 0], { extrapolateRight: 'clamp' });
    const rightX = interpolate(frame, [0, 40], [100, 0], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ flexDirection: 'row' }}>
            {/* LEFT: SCREEN */}
            <div style={{ 
                flex: 1, backgroundColor: '#222', 
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                transform: `translateX(${leftX}%)` 
            }}>
                <Smartphone size={80} color="#666" />
                <h1 style={{ fontFamily, fontSize: 60, color: '#666', marginTop: 20 }}>SCREEN</h1>
                <p style={{ fontFamily, color: '#666' }}>को चलाओगे?</p>
            </div>

            {/* RIGHT: LIFE */}
            <div style={{ 
                flex: 1, backgroundColor: '#fff', 
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                transform: `translateX(${rightX}%)` 
            }}>
                <Sun size={80} color={ACCENT_COLOR} />
                <h1 style={{ fontFamily, fontSize: 60, color: '#222', marginTop: 20 }}>LIFE</h1>
                <p style={{ fontFamily, color: '#222' }}>या Life को?</p>
            </div>
            
            <div style={{
                position: 'absolute', width: 4, height: '100%', backgroundColor: ACCENT_COLOR, left: '50%', marginLeft: -2
            }}/>
        </AbsoluteFill>
    );
};


// --- MAIN COMPOSITION ---

export const MyVideo = () => {
	return (
		<AbsoluteFill style={{ backgroundColor: BG_COLOR }}>
            {/* AUDIO LAYER - Assumes voiceover.mp3 is in public folder */}
            <Html5Audio src={staticFile("audio/bg.mp3")} />
			
			<Sequence from={SCENE_STARTS[0]} durationInFrames={SCENE_FRAMES[0]}>
				<Scene1 />
			</Sequence>
			<Sequence from={SCENE_STARTS[1]} durationInFrames={SCENE_FRAMES[1]}>
				<Scene2 />
			</Sequence>
			<Sequence from={SCENE_STARTS[2]} durationInFrames={SCENE_FRAMES[2]}>
				<Scene3 />
			</Sequence>
			<Sequence from={SCENE_STARTS[3]} durationInFrames={SCENE_FRAMES[3]}>
				<Scene4 />
			</Sequence>
			<Sequence from={SCENE_STARTS[4]} durationInFrames={SCENE_FRAMES[4]}>
				<Scene5 />
			</Sequence>
			<Sequence from={SCENE_STARTS[5]} durationInFrames={SCENE_FRAMES[5]}>
				<Scene6 />
			</Sequence>
			<Sequence from={SCENE_STARTS[6]} durationInFrames={SCENE_FRAMES[6]}>
				<Scene7 />
			</Sequence>
			<Sequence from={SCENE_STARTS[7]} durationInFrames={SCENE_FRAMES[7]}>
				<Scene8 />
			</Sequence>
            <Sequence from={SCENE_STARTS[8]} durationInFrames={SCENE_FRAMES[8]}>
				<Scene9 />
			</Sequence>
            <Sequence from={SCENE_STARTS[9]} durationInFrames={SCENE_FRAMES[9]}>
				<Scene10 />
			</Sequence>
		</AbsoluteFill>
	);
};