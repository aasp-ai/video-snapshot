import React from 'react';
import { useCurrentFrame, useTransform } from 'remotion';
import { Easing } from '@remotion/easing';

export const GlitchTitle = () => {
    const frame = useCurrentFrame();

    const glitchOffset = useTransform(frame, [0, 1], [0, Math.random() > 0.95 ? 3 : 0]);

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: '#0a0a0a',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div style={{ position: 'relative' }}>
                <span
                    style={{
                        fontFamily: 'Oswald',
                        fontSize: 120,
                        fontWeight: 800,
                        color: '#ff0050',
                        position: 'absolute',
                        left: -3,
                        top: 0,
                        transform: `translateX(${-glitchOffset}px)`,
                    }}
                >
                    GLITCH
                </span>
                <span
                    style={{
                        fontFamily: 'Oswald',
                        fontSize: 120,
                        fontWeight: 800,
                        color: '#00ffff',
                        position: 'absolute',
                        left: 3,
                        top: 0,
                        transform: `translateX(${glitchOffset}px)`,
                    }}
                >
                    GLITCH
                </span>
                <span
                    style={{
                        fontFamily: 'Oswald',
                        fontSize: 120,
                        fontWeight: 800,
                        color: '#ffffff',
                    }}
                >
                    GLITCH
                </span>
            </div>
        </div>
    );
};

export default GlitchTitle;
