import { AbsoluteFill, Sequence } from 'remotion';

/**
 * EXAMPLE: How to create custom compositions using modular template system
 * 
 * This demonstrates how AI agents can mix and match components from template
 * library to create custom videos.
 */

export const CustomComposition = () => {
    return (
        <AbsoluteFill style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)' }}>
            <Sequence from={0} durationInFrames={300}>
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    Custom Composition Example
                </div>
            </Sequence>
        </AbsoluteFill>
    );
};

export const CUSTOM_CONFIG = {
    width: 1080,
    height: 1920,
    fps: 30,
    durationInFrames: 300,
    id: "Custom-Composition"
};

/**
 * EXAMPLE 2: Minimal composition with just Three.js
 */
export const MinimalComposition = () => {
    return (
        <AbsoluteFill style={{ background: '#000' }}>
            <Sequence from={0} durationInFrames={180}>
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: 'white'
                }}>
                    Minimal Composition
                </div>
            </Sequence>
        </AbsoluteFill>
    );
};

/**
 * EXAMPLE 3: Text-focused composition with GSAP
 */
export const TextFocusedComposition = () => {
    return (
        <AbsoluteFill style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'white',
                fontSize: '48px',
                fontWeight: 'bold'
            }}>
                Text-Focused Video
            </div>
        </AbsoluteFill>
    );
};

/**
 * EXAMPLE 4: Multi-scene composition
 */
export const MultiSceneComposition = () => {
    return (
        <AbsoluteFill>
            <Sequence from={0} durationInFrames={90}>
                <Scene1 />
            </Sequence>
            <Sequence from={90} durationInFrames={90}>
                <Scene2 />
            </Sequence>
            <Sequence from={180} durationInFrames={120}>
                <Scene3 />
            </Sequence>
        </AbsoluteFill>
    );
};

const Scene1 = () => (
    <AbsoluteFill style={{ background: '#0070f3' }}>
        <div style={{ 
            position: 'absolute', 
            left: '50%', 
            top: '50%', 
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '64px',
            fontWeight: 'bold'
        }}>
            Scene 1
        </div>
    </AbsoluteFill>
);

const Scene2 = () => (
    <AbsoluteFill style={{ background: '#ff6b6b' }}>
        <div style={{ 
            position: 'absolute', 
            left: '50%', 
            top: '50%', 
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '64px',
            fontWeight: 'bold'
        }}>
            Scene 2
        </div>
    </AbsoluteFill>
);

const Scene3 = () => (
    <AbsoluteFill style={{ background: '#00ff00' }}>
        <div style={{ 
            position: 'absolute', 
            left: '50%', 
            top: '50%', 
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '64px',
            fontWeight: 'bold'
        }}>
            Scene 3
        </div>
    </AbsoluteFill>
);
