import { useEffect, useState } from 'react';
import { useCurrentFrame, AbsoluteFill } from 'remotion';
import { createNoise2D } from 'simplex-noise';

export const NoiseTexture = () => {
    const frame = useCurrentFrame();
    const [noiseData, setNoiseData] = useState<number[][]>([]);

    useEffect(() => {
        const noise2D = createNoise2D();
        const data: number[][] = [];
        const rows = 50;
        const cols = 50;

        for (let y = 0; y < rows; y++) {
            const row: number[] = [];
            for (let x = 0; x < cols; x++) {
                const value = noise2D(
                    x * 0.1 + frame * 0.01,
                    y * 0.1 + frame * 0.01
                );
                row.push(value);
            }
            data.push(row);
        }
        setNoiseData(data);
    }, [frame]);

    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', left: '50%', top: '25%', transform: 'translateX(-50%)' }}>
                <NoiseGrid noiseData={noiseData} />
            </div>
            
            <div style={{ position: 'absolute', left: '50%', top: '55%', transform: 'translateX(-50%)' }}>
                <NoiseParticles frame={frame} />
            </div>
        </AbsoluteFill>
    );
};

interface NoiseGridProps {
    noiseData: number[][];
}

const NoiseGrid = ({ noiseData }: NoiseGridProps) => {
    return (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(50, 10px)', 
            gap: '1px',
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '10px',
            borderRadius: '10px'
        }}>
            {noiseData.map((row, y) =>
                row.map((value, x) => (
                    <div
                        key={`${x}-${y}`}
                        style={{
                            width: '10px',
                            height: '10px',
                            background: `hsl(${(value + 1) * 180}, 70%, 50%)`,
                            opacity: (value + 1) / 2
                        }}
                    />
                ))
            )}
        </div>
    );
};

interface NoiseParticlesProps {
    frame: number;
}

const NoiseParticles = ({ frame }: NoiseParticlesProps) => {
    const noise2D = createNoise2D();
    const particles = Array.from({ length: 30 }, (_, i) => {
        const angle = noise2D(i, frame * 0.01) * Math.PI * 2;
        const radius = 50 + noise2D(i + 100, frame * 0.01) * 50;
        
        return {
            x: Math.cos(angle) * radius + 150,
            y: Math.sin(angle) * radius + 150,
            size: 5 + noise2D(i + 200, frame * 0.01) * 5,
            hue: (noise2D(i + 300, frame * 0.01) + 1) * 180
        };
    });

    return (
        <svg width="300" height="300" viewBox="0 0 300 300">
            <text x="150" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                Simplex Noise Particles
            </text>
            {particles.map((particle, i) => (
                <circle
                    key={i}
                    cx={particle.x}
                    cy={particle.y}
                    r={particle.size}
                    fill={`hsl(${particle.hue}, 70%, 60%)`}
                    opacity={0.8}
                />
            ))}
        </svg>
    );
};
