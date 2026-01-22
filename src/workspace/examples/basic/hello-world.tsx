import React from 'react';
import { useCurrentFrame } from 'remotion';

export const HelloWorld = () => {
    const frame = useCurrentFrame();

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#0a0a0a',
            }}
        >
            <h1
                style={{
                    fontFamily: 'Inter',
                    fontSize: 80,
                    fontWeight: 800,
                    color: '#ffffff',
                }}
            >
                Hello World
            </h1>
        </div>
    );
};

export default HelloWorld;
