import React from 'react';
import { useCurrentFrame, useTransform } from 'remotion';

export const TikTokIntro = () => {
    const frame = useCurrentFrame();

    const scale = useTransform(frame, [0, 30], [0.5, 1]);
    const opacity = useTransform(frame, [0, 15], [0, 1]);

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: '#000000',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff0050 0%, #ff00a0 100%)',
                    transform: `scale(${scale})`,
                    opacity,
                }}
            />
            <h1
                style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: 120,
                    color: '#ffffff',
                    marginTop: 40,
                    opacity,
                    letterSpacing: 4,
                }}
            >
                SWIPE UP
            </h1>
            <div
                style={{
                    marginTop: 20,
                    padding: '12px 32px',
                    background: '#ff0050',
                    borderRadius: 30,
                    color: '#ffffff',
                    fontFamily: 'Inter',
                    fontSize: 24,
                    fontWeight: 600,
                    opacity,
                }}
            >
                Follow for more
            </div>
        </div>
    );
};

export default TikTokIntro;
