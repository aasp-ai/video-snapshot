import { AbsoluteFill } from 'remotion';

export const D3Chart = () => {
    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', left: '5%', top: '5%', width: '400px', height: '300px' }}>
                <LineChart />
            </div>
            
            <div style={{ position: 'absolute', left: '5%', top: '50%', width: '500px', height: '250px' }}>
                <BarChart />
            </div>
        </AbsoluteFill>
    );
};

const LineChart = () => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 400 300">
            <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0070f3" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#0070f3" stopOpacity={0} />
                </linearGradient>
            </defs>
            
            <text x="200" y="30" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
                D3.js Line Chart
            </text>
            
            <path
                d="M 50 150 L 80 70 L 110 230 L 140 90 L 170 170 L 200 50 L 230 130 L 260 90 L 290 170 L 320 110 L 350 150"
                fill="url(#areaGradient)"
                stroke="none"
            />
            
            <path
                d="M 50 150 L 80 70 L 110 230 L 140 90 L 170 170 L 200 50 L 230 130 L 260 90 L 290 170 L 320 110 L 350 150"
                fill="none"
                stroke="#0070f3"
                strokeWidth={3}
            />
        </svg>
    );
};

const BarChart = () => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 500 250">
            <text x="250" y="30" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
                D3.js Bar Chart
            </text>
            
            {[30, 50, 70, 40, 60, 80, 45, 65, 55, 75].map((height, i) => (
                <rect
                    key={i}
                    x={i * 40 + 50}
                    y={220 - height}
                    width={30}
                    height={height}
                    fill={`hsl(${i * 36}, 70%, 50%)`}
                    rx={2}
                />
            ))}
            
            <line x1={40} y1={220} x2={460} y2={220} stroke="white" strokeWidth={2} />
        </svg>
    );
};
