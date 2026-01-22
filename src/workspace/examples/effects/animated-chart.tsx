import React from 'react';
import { useCurrentFrame, useTransform } from 'remotion';

interface DataPoint {
    label: string;
    value: number;
    color?: string;
}

export const AnimatedChart = () => {
    const frame = useCurrentFrame();

    const data: DataPoint[] = [
        { label: 'Jan', value: 40, color: '#3b82f6' },
        { label: 'Feb', value: 65, color: '#8b5cf6' },
        { label: 'Mar', value: 55, color: '#06b6d4' },
        { label: 'Apr', value: 85, color: '#10b981' },
        { label: 'May', value: 70, color: '#f59e0b' },
    ];

    const maxValue = Math.max(...data.map(d => d.value));
    const chartHeight = 300;
    const barWidth = 80;
    const barGap = 40;
    const totalWidth = data.length * barWidth + (data.length - 1) * barGap;
    const startX = (1920 - totalWidth) / 2;

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: '#0a0a0a',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <h2
                style={{
                    fontFamily: 'Inter',
                    fontSize: 48,
                    fontWeight: 700,
                    color: '#ffffff',
                    textAlign: 'center',
                    marginBottom: 60,
                }}
            >
                Monthly Performance
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {data.map((item, index) => {
                    const x = startX + index * (barWidth + barGap);
                    const barHeight = (item.value / maxValue) * chartHeight;
                    const startFrame = index * 15;
                    const progress = Math.max(0, Math.min(1, (frame - startFrame) / 30));

                    return (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                left: x,
                                top: '50%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: barWidth,
                                    height: barHeight * progress,
                                    background: item.color,
                                    borderRadius: 8,
                                    transformOrigin: 'bottom',
                                }}
                            />
                            <div
                                style={{
                                    marginTop: 16,
                                    fontFamily: 'Inter',
                                    fontSize: 20,
                                    color: '#ffffff',
                                }}
                            >
                                {item.label}
                            </div>
                            <div
                                style={{
                                    fontFamily: 'Inter',
                                    fontSize: 16,
                                    color: 'rgba(255,255,255,0.6)',
                                }}
                            >
                                {item.value}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AnimatedChart;
