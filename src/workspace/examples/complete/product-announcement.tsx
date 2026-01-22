import React from 'react';
import { useCurrentFrame, useTransform } from 'remotion';
import { Easing } from '@remotion/easing';

export const ProductAnnouncement = () => {
    const frame = useCurrentFrame();

    return (
        <>
            <Scene1 frame={frame} />
            <Scene2 frame={frame} />
            <Scene3 frame={frame} />
        </>
    );
};

const Scene1 = ({ frame }: { frame: number }) => {
    const opacity = useTransform(frame, [0, 30], [0, 1]);
    const y = useTransform(frame, [0, 30], [50, 0], { easing: Easing.out(Easing.cubic) });

    if (frame > 90) return null;

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
                opacity: frame < 90 ? 1 : useTransform(frame, [90, 105], [1, 0]),
            }}
        >
            <h1
                style={{
                    fontFamily: 'Inter',
                    fontSize: 80,
                    fontWeight: 800,
                    color: '#ffffff',
                    opacity,
                    transform: `translateY(${y}px)`,
                }}
            >
                Introducing
            </h1>
        </div>
    );
};

const Scene2 = ({ frame }: { frame: number }) => {
    if (frame < 90 || frame > 180) return null;

    const opacity = useTransform(frame, [90, 120], [0, 1]);
    const scale = useTransform(frame, [90, 120], [0.8, 1], { easing: Easing.out(Easing.cubic) });

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: '#0a0a0a',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                opacity,
            }}
        >
            <div
                style={{
                    width: 400,
                    height: 400,
                    borderRadius: 24,
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    transform: `scale(${scale})`,
                }}
            />
            <h1
                style={{
                    fontFamily: 'Inter',
                    fontSize: 64,
                    fontWeight: 700,
                    color: '#ffffff',
                    marginTop: 40,
                }}
            >
                Product Name
            </h1>
            <p
                style={{
                    fontFamily: 'Inter',
                    fontSize: 28,
                    color: 'rgba(255,255,255,0.7)',
                    marginTop: 16,
                }}
            >
                The future of productivity
            </p>
        </div>
    );
};

const Scene3 = ({ frame }: { frame: number }) => {
    if (frame < 180) return null;

    const opacity = useTransform(frame, [180, 210], [0, 1]);

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: '#0a0a0a',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                opacity,
            }}
        >
            <h1
                style={{
                    fontFamily: 'Inter',
                    fontSize: 56,
                    fontWeight: 700,
                    color: '#ffffff',
                    textAlign: 'center',
                }}
            >
                Available Now
            </h1>
            <div
                style={{
                    display: 'flex',
                    gap: 20,
                    marginTop: 40,
                }}
            >
                <button
                    style={{
                        padding: '16px 48px',
                        background: '#3b82f6',
                        border: 'none',
                        borderRadius: 12,
                        color: '#ffffff',
                        fontFamily: 'Inter',
                        fontSize: 24,
                        fontWeight: 600,
                        cursor: 'pointer',
                    }}
                >
                    Get Started
                </button>
                <button
                    style={{
                        padding: '16px 48px',
                        background: 'transparent',
                        border: '2px solid #3b82f6',
                        borderRadius: 12,
                        color: '#3b82f6',
                        fontFamily: 'Inter',
                        fontSize: 24,
                        fontWeight: 600,
                    }}
                >
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default ProductAnnouncement;
