import { AbsoluteFill } from 'remotion';

export const MotionBlur = () => {
    return (
        <AbsoluteFill style={{
            pointerEvents: 'none',
            backdropFilter: 'blur(5px)',
            background: 'rgba(0, 112, 243, 0.1)'
        }}>
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '20%',
                transform: 'translateX(-50%)',
                fontSize: '24px',
                color: 'white',
                fontWeight: 'bold',
                textShadow: '0 0 20px rgba(0, 112, 243, 0.8)'
            }}>
                Motion Blur Effect
            </div>
        </AbsoluteFill>
    );
};

export const VelocityIndicator = () => {
    const velocityX = Math.sin(0) * 500;
    const velocityY = Math.cos(0) * 300;

    return (
        <div style={{
            position: 'absolute',
            left: '20px',
            top: '20px',
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '20px',
            borderRadius: '10px',
            color: 'white',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.6'
        }}>
            <div>Velocity X: {velocityX.toFixed(2)}</div>
            <div>Velocity Y: {velocityY.toFixed(2)}</div>
            <div>Speed: {Math.sqrt(velocityX ** 2 + velocityY ** 2).toFixed(2)}</div>
        </div>
    );
};
