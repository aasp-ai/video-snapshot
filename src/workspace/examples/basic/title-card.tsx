import React from 'react';
import { useCurrentFrame, useTransform } from 'remotion';
import { Easing } from '@remotion/easing';

export const TitleCard = () => {
    const frame = useCurrentFrame();

    const opacity = useTransform(frame, [0, 30], [0, 1]);
    const y = useTransform(frame, [0, 30], [50, 0], { easing: Easing.out(Easing.cubic) });

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <h1
                style={{
                    fontFamily: 'Inter',
                    fontSize: 72,
                    fontWeight: 800,
                    color: '#ffffff',
                    opacity,
                    transform: `translateY(${y}px)`,
                    textAlign: 'center',
                    padding: '0 40px',
                }}
            >
                Professional Title Card
            </h1>
            <p
                style={{
                    fontFamily: 'Inter',
                    fontSize: 28,
                    color: 'rgba(255,255,255,0.8)',
                    marginTop: 20,
                    opacity,
                }}
            >
                Perfect for your video content
            </p>
        </div>
    );
};

export default TitleCard;
