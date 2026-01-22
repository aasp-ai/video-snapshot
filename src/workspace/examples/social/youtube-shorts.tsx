import React from 'react';
import { useCurrentFrame, useTransform } from 'remotion';

export const YouTubeShorts = () => {
    const frame = useCurrentFrame();

    const progress = Math.min(1, frame / 60);

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, #1a1a1a, #0a0a0a)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 40,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    marginBottom: 20,
                }}
            >
                <div
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: '#ff0000',
                    }}
                />
                <div>
                    <div
                        style={{
                            fontFamily: 'Inter',
                            fontSize: 24,
                            fontWeight: 600,
                            color: '#ffffff',
                        }}
                    >
                        Channel Name
                    </div>
                    <div
                        style={{
                            fontFamily: 'Inter',
                            fontSize: 16,
                            color: 'rgba(255,255,255,0.7)',
                        }}
                    >
                        @channelname
                    </div>
                </div>
                <div
                    style={{
                        marginLeft: 'auto',
                        padding: '8px 24px',
                        background: '#ff0000',
                        borderRadius: 20,
                        color: '#ffffff',
                        fontFamily: 'Inter',
                        fontSize: 18,
                        fontWeight: 600,
                    }}
                >
                    SUBSCRIBE
                </div>
            </div>
            <div
                style={{
                    fontFamily: 'Inter',
                    fontSize: 32,
                    color: '#ffffff',
                    marginBottom: 20,
                    lineHeight: 1.4,
                }}
            >
                Check out this amazing YouTube Shorts video! Don't forget to like and subscribe for more content.
            </div>
            <div
                style={{
                    display: 'flex',
                    gap: 20,
                }}
            >
                {['❤️ 12K', '💬 456', '↗️ Share'].map((action, i) => (
                    <div
                        key={i}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >
                        <div
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.1)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 24,
                            }}
                        >
                            {action.split(' ')[0]}
                        </div>
                        <span
                            style={{
                                fontFamily: 'Inter',
                                fontSize: 14,
                                color: 'rgba(255,255,255,0.7)',
                            }}
                        >
                            {action.split(' ').slice(1).join(' ')}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YouTubeShorts;
