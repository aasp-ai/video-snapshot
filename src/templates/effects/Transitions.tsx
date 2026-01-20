import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';

export const Transitions = () => {
    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '400px' }}>
                <TransitionSeries>
                    <TransitionItem>
                        <SlideTransition />
                    </TransitionItem>
                    
                    <TransitionItem>
                        <WipeTransition />
                    </TransitionItem>
                    
                    <TransitionItem>
                        <FadeTransition />
                    </TransitionItem>
                </TransitionSeries>
            </div>
        </AbsoluteFill>
    );
};

const TransitionSeries = ({ children }: { children: React.ReactNode }) => {
    const frame = useCurrentFrame();
    
    const childrenArray = React.Children.toArray(children);
    
    const currentIndex = Math.floor(frame / 30) % childrenArray.length;
    
    return <>{childrenArray[currentIndex]}</>;
};

const TransitionItem = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

const SlideTransition = () => {
    const frame = 0;
    const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
    const x = interpolate(frame, [0, 15], [-100, 0], { extrapolateRight: 'clamp' });

    return (
        <div style={{
            opacity,
            transform: `translateX(${x}%)`,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #0070f3, #00d4ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 112, 243, 0.5)'
        }}>
            <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>Slide Transition</h2>
        </div>
    );
};

const WipeTransition = () => {
    const frame = 0;
    const clipX = interpolate(frame, [0, 30], [0, 100], { extrapolateRight: 'clamp' });

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #ff6b6b, #ff9933)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(255, 107, 107, 0.5)',
            clipPath: `polygon(0 0, ${clipX}% 0, ${clipX}% 100%, 0 100%)`
        }}>
            <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>Wipe Transition</h2>
        </div>
    );
};

const FadeTransition = () => {
    const frame = 0;
    const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
    const scale = interpolate(frame, [0, 30], [0.8, 1], { extrapolateRight: 'clamp' });

    return (
        <div style={{
            opacity,
            transform: `scale(${scale})`,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #00ff00, #00cc99)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 255, 0, 0.5)'
        }}>
            <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>Fade Transition</h2>
        </div>
    );
};

export const TransitionDemo = () => {
    const frame = 0;

    const scenes = [
        { name: 'Slide', color: '#0070f3', offset: 0 },
        { name: 'Wipe', color: '#ff6b6b', offset: 30 },
        { name: 'Fade', color: '#00ff00', offset: 60 },
        { name: 'Scale', color: '#ffff00', offset: 90 },
        { name: 'Flip', color: '#ff00ff', offset: 120 }
    ];

    const activeScene = scenes.find(s => frame >= s.offset && frame < s.offset + 30);

    if (!activeScene) return null;

    const progress = (frame - activeScene.offset) / 30;

    const opacity = interpolate(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = interpolate(progress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
    const rotate = interpolate(progress, [0, 1], [180, 0]);

    return (
        <div style={{
            position: 'absolute',
            left: '50%',
            top: '30%',
            transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
            opacity,
            width: '500px',
            height: '300px',
            background: `linear-gradient(135deg, ${activeScene.color}, ${activeScene.color}88)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '20px',
            boxShadow: `0 20px 60px ${activeScene.color}80`,
            transition: 'all 0.1s ease'
        }}>
            <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>{activeScene.name}</h2>
        </div>
    );
};
